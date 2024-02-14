import React, { useState, useContext, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import {
  addTask,
  getCategories,
  addCategory,
  addSubCategory,
  checkEmailExists,
} from "../utils/api";
import { UserContext } from "../contexts/UserContext";
import { FaTrash } from "react-icons/fa";
import linesBottom from "../assets/greenLinesBottom.png";

export default function NewTask() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSpecificDate, setIsSpecificDate] = useState(false);
  const [isRecurrence, setIsRecurrence] = useState(false);
  const [inputList, setInputList] = useState([]);
  const { userId } = useContext(UserContext);
  const [successMessage, setSuccessMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedMonthDays, setSelectedMonthDays] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    taskDescription: "",
    priority: "",
    subcategory: "",
    category: "",
    deadline: "",
    users: [userId],
    days: [],
  });

  const daysOfWeekOptions = [
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
    { value: "Sunday", label: "Sunday" },
  ];

  const daysInMonth = (year, month) => new Date(year, month, 0).getDate();

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;

  const numberOfDays = daysInMonth(currentYear, currentMonth);

  const daysOfMonthOptions = [];
  for (let day = 1; day <= numberOfDays; day++) {
    daysOfMonthOptions.push({
      value: day,
      label: `${day}`,
    });
  }

  const handleDelete = () => {
    resetForm();
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(
          res.map((category) => ({
            label: category.name,
            value: category._id,
            subcategories: category.subcategories,
          }))
        );
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleCategoryChange = (newValue) => {
    setSelectedCategory(newValue);
    setSubcategories(
      newValue
        ? newValue.subcategories.map((sub) => ({
            label: sub.name,
            value: sub._id,
          }))
        : []
    );
    setFormData((prev) => ({
      ...prev,
      category: newValue ? newValue.value : "",
      subcategory: "",
    }));
  };

  const handleSubcategoryChange = (newValue) => {
    setSelectedSubcategory(newValue);
    setFormData((prev) => ({
      ...prev,
      subcategory: newValue ? newValue.value : "",
    }));
  };

  const handleDayChange = (selectedOptions) => {
    setSelectedDays(selectedOptions.map((option) => option.value));
    setSelectedMonthDays([]);
  };

  const handleMonthDayChange = (selectedOptions) => {
    setSelectedMonthDays(selectedOptions);
    setSelectedDays([]);
  };

  const handleCreateCategory = async (inputValue) => {
    setIsLoading(true);
    try {
      const newCategory = await addCategory({ name: inputValue });
      const newOption = {
        label: newCategory.name,
        value: newCategory._id,
        subcategories: [],
      };
      setCategories((prev) => [...prev, newOption]);
      setSelectedCategory(newOption);
      setFormData((prev) => ({
        ...prev,
        category: newCategory._id,
        subcategory: "",
      }));
    } catch (error) {
      console.error("Error adding category:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateSubcategory = async (inputValue) => {
    if (!selectedCategory) return;
    setIsLoading(true);
    try {
      const newSubcategory = await addSubCategory({
        name: inputValue,
        categoryId: selectedCategory.value,
      });
      const newOption = {
        label: newSubcategory.name,
        value: newSubcategory._id,
      };
      setSubcategories((prev) => [...prev, newOption]);
      setSelectedSubcategory(newOption);
      setFormData((prev) => ({
        ...prev,
        subcategory: newSubcategory._id,
      }));
    } catch (error) {
      console.error("Error adding subcategory:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleEmailChange = async (index, email) => {
    const newList = [...inputList];
    newList[index].value = email;

    if (!isValidEmail(email)) {
      newList[index].error = "Please enter a valid email address.";
    } else {
      newList[index].error = "";
      try {
        const response = await checkEmailExists({ email });
        if (response.userId) {
          setFormData((prev) => ({
            ...prev,
            users: prev.users.includes(response.userId)
              ? prev.users
              : [...prev.users, response.userId],
          }));
        } else {
          newList[index].error = "Email does not exist.";
        }
      } catch (error) {
        console.error("Error validating email:", error);
        newList[index].error = "Error validating email.";
      }
    }

    setInputList(newList);
  };

  const handleDeleteEmailInput = (index) => {
    const newList = [...inputList];
    newList.splice(index, 1);
    setInputList(newList);
  };

  const onAddBtnClick = () => {
    setInputList([
      ...inputList,
      { key: inputList.length, value: "", error: "" },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.category ||
      !formData.priority ||
      !formData.taskDescription ||
      !formData.subcategory
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    if (
      isRecurrence &&
      selectedDays.length === 0 &&
      selectedMonthDays.length === 0
    ) {
      alert("Please select recurrence days.");
      return;
    }

    if (isSpecificDate && !formData.deadline) {
      alert("Please specify a deadline.");
      return;
    }

    const taskData = {
      ...formData,
      days: isRecurrence
        ? [...selectedDays, ...selectedMonthDays.map((day) => day.value)]
        : [],
      deadline: isSpecificDate ? formData.deadline : null,
      isCompleted: false,
    };

    try {
      await addTask(taskData);
      setSuccessMessage("New task has been added successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
      resetForm();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      taskDescription: "",
      priority: "",
      subcategory: "",
      category: "",
      deadline: "",
      users: [userId],
      days: [],
    });
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setSelectedDays([]);
    setSelectedMonthDays([]);
    setIsSpecificDate(false);
    setIsRecurrence(false);
    setInputList([]);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderColor: "var(--clr-medium-green)",
      boxShadow: "none",
      "&:hover": {
        borderColor: "var(--clr-dark-green)",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "var(--clr-medium-green)"
        : state.isFocused
        ? "var(--clr-light-green)"
        : "var(--clr-white)",
      color: state.isSelected ? "var(--clr-white)" : "var(--clr-dark-green)",
      "&:active": {
        backgroundColor: "var(--clr-dark-green)",
      },
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "var(--clr-medium-green)",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "var(--clr-white)",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "var(--clr-white)",
      ":hover": {
        backgroundColor: "var(--clr-dark-green)",
        color: "var(--clr-white)",
      },
    }),
  };

  return (
    <div className="flex flex-col items-center md:ml-20">
      {successMessage && (
        <div className="text-green-500 mb-4">{successMessage}</div>
      )}
      <form className="w-full max-w-screen-lg" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-4">
          {/* Left Column */}
          <div className="w-full md:w-1/2 px-4 md:px-8 lg:px-12">
            <label htmlFor="task">Task *</label>
            <input
              value={formData.name}
              type="text"
              className="block w-full md:w-3/4 mb-4"
              onChange={(e) => handleInputChange("name", e.target.value)}
            />

            <label htmlFor="category">Category *</label>
            <div className="w-3/4">
              <CreatableSelect
                isClearable
                isDisabled={isLoading}
                isLoading={isLoading}
                onChange={handleCategoryChange}
                onCreateOption={handleCreateCategory}
                options={categories}
                value={selectedCategory}
                placeholder="Select or create"
                styles={customStyles}
              />

              <label htmlFor="sub-category">Sub-Category *</label>
              <CreatableSelect
                isClearable
                isDisabled={!selectedCategory || isLoading}
                isLoading={isLoading}
                onChange={handleSubcategoryChange}
                onCreateOption={handleCreateSubcategory}
                options={subcategories}
                value={selectedSubcategory}
                placeholder="Select or create"
                styles={customStyles}
              />
            </div>

            <label htmlFor="priority">Priority *</label>
            <input
              value={formData.priority}
              type="number"
              min="1"
              max="5"
              className="block w-full md:w-3/4 mb-4"
              onChange={(e) => handleInputChange("priority", e.target.value)}
            />

            <div className="flex items-center">
              <input
                id="specific-date"
                type="checkbox"
                checked={isSpecificDate}
                onChange={() => setIsSpecificDate(!isSpecificDate)}
                className="form-checkbox h-4 w-4 mt-2 mr-1"
              />
              <label htmlFor="specific-date" className="flex items-center mr-2">
                Specific Date <span className="ml-1">*</span>
              </label>
            </div>
            <input
              value={formData.deadline}
              type="date"
              disabled={!isSpecificDate}
              className="mb-4 w-full md:w-3/4"
              onChange={(e) => handleInputChange("deadline", e.target.value)}
            />

            <label htmlFor="email">Who is working with you on this task?</label>
            {inputList.map((input, index) => (
              <div key={index} className="mb-4">
                <div className="flex items-center">
                  <input
                    type="email"
                    value={input.value}
                    className="rounded-full w-3/4"
                    placeholder="user@example.com"
                    onChange={(e) => handleEmailChange(index, e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteEmailInput(index)}
                    className="ml-2 border-none"
                  >
                    <FaTrash size={20} />
                  </button>
                </div>
                {input.error && (
                  <p className="text-red-500 text-xs mt-1">{input.error}</p>
                )}
              </div>
            ))}

            <button type="button" onClick={onAddBtnClick} className="mt-2">
              + Add Email
            </button>
          </div>

          {/* Right Column */}
          <div className="w-full md:w-1/2 px-4 md:px-8 lg:px-12">
            <label htmlFor="description">Description *</label>
            <textarea
              value={formData.taskDescription}
              className="block w-full md:w-3/4"
              onChange={(e) =>
                handleInputChange("taskDescription", e.target.value)
              }
            ></textarea>

            <div className="flex items-center mt-5">
              <input
                id="recurrence"
                type="checkbox"
                checked={isRecurrence}
                onChange={() => setIsRecurrence(!isRecurrence)}
                className="form-checkbox h-4 w-4 mt-2 mr-1"
              />{" "}
              <label htmlFor="recurrence" className="flex items-center mr-2">
                Recurrence <span className="ml-1">*</span>
              </label>
            </div>
            <div className="w-3/4">
              <Select
                isMulti
                isDisabled={!isRecurrence}
                options={daysOfWeekOptions}
                onChange={handleDayChange}
                value={daysOfWeekOptions.filter((option) =>
                  selectedDays.includes(option.value)
                )}
                placeholder="Select day(s) of the week"
                styles={customStyles}
              />
              <div className="mt-3">
                <Select
                  isMulti
                  isDisabled={!isRecurrence}
                  options={daysOfMonthOptions}
                  onChange={handleMonthDayChange}
                  value={selectedMonthDays}
                  placeholder="Select day(s) of the month"
                  styles={customStyles}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center mt-20">
          <button
            type="button"
            onClick={handleDelete}
            className="p-2 w-32 rounded-full m-2"
          >
            Delete
          </button>
          <button
            type="submit"
            className="bg-mediumGreen text-white p-2 w-32 rounded-full m-2"
          >
            Save
          </button>
        </div>
        <div className="fixed bottom-4 right-4">
          <figure className="ml-1">
            <img src={linesBottom} alt="Task Zen design element" />
          </figure>
        </div>
      </form>
    </div>
  );
}
