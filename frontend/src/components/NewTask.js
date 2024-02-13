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
import linesBottom from "../assets/greenLinesBottom.png";
import { FaTrash } from "react-icons/fa";

export default function NewTask() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSpecificDate, setIsSpecificDate] = useState(false);
  const [isRecurrence, setIsRecurrence] = useState(false);
  const [inputList, setInputList] = useState([]);
  const { userId } = useContext(UserContext);
  const [emailErrors, setEmailErrors] = useState({});
  const daysInMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  ).getDate();

  const isValidNameOrDescription = (text) =>
    /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(text);
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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

  const daysOfMonthOptions = [...Array(daysInMonth).keys()].map((day) => ({
    value: day + 1,
    label: `${day + 1}`,
  }));

  const handleDayChange = (selectedOptions) => {
    setSelectedDays(selectedOptions.map((option) => option.value));
    setSelectedMonthDays([]);
  };

  const handleMonthDayChange = (selectedOptions) => {
    setSelectedMonthDays(selectedOptions);
    setSelectedDays([]);
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

  const handleCreateCategory = async (inputValue) => {
    setIsLoading(true);
    if (!isValidNameOrDescription(inputValue)) {
      console.error("Invalid category name.");
      return;
    }
    try {
      const response = await addCategory({ name: inputValue });
      const newCategory = response;
      const newOption = {
        label: newCategory.name,
        value: newCategory._id,
        subcategories: [],
      };
      setCategories((prev) => [...prev, newOption]);
      setSelectedCategory(newOption);
    } catch (error) {
      console.error("Error adding category:", error);
    }
    setIsLoading(false);
  };

  const handleCreateSubcategory = async (inputValue) => {
    if (!selectedCategory) return;
    if (!isValidNameOrDescription(inputValue)) {
      console.error("Invalid subcategory name.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await addSubCategory({
        name: inputValue,
        categoryId: selectedCategory.value,
      });
      const newSubcategory = response;
      const newOption = {
        label: newSubcategory.name,
        value: newSubcategory._id,
      };
      setSubcategories((prev) => [...prev, newOption]);
      setSelectedSubcategory(newOption);
    } catch (error) {
      console.error("Error adding subcategory:", error);
    }
    setIsLoading(false);
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

    const days = isRecurrence
      ? [...selectedDays, ...selectedMonthDays.map((day) => day.value)]
      : [];

    const taskData = {
      ...formData,
      days,
      deadline: isSpecificDate ? formData.deadline : null,
    };

    try {
      await addTask(taskData);
      resetForm();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDelete = () => {
    resetForm();
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
    setSelectedDays([]);
    setSelectedMonthDays([]);
    setIsSpecificDate(false);
    setIsRecurrence(false);
    setInputList([]);
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setSubcategories([]);
  };

  const onAddBtnClick = async () => {
    const newInput = {
      key: inputList.length,
      value: "",
      error: "",
    };

    setInputList([...inputList, newInput]);
  };

  const handleEmailChange = async (index, email) => {
    let newInputList = [...inputList];
    newInputList[index].value = email;

    // Basic email format validation
    if (!isValidEmail(email)) {
      newInputList[index].error = "Please enter a valid email address.";
      setInputList(newInputList);
      return;
    }

    if (formData.users.includes(email) || email === userId) {
      newInputList[index].error =
        "This email is already added or is your own email.";
      setInputList(newInputList);
      return;
    }

    try {
      const response = await checkEmailExists({ email });
      if (response.userId) {
        setFormData((prev) => ({
          ...prev,
          users: [...prev.users, response.userId],
        }));
        newInputList[index].error = "";
      }
    } catch (error) {
      console.error("Error validating email:", error);
      newInputList[index].error = "Error validating email.";
    }

    setInputList(newInputList);
  };

  const validateTaskAndDescription = () => {
    let errors = {};
    if (!isValidNameOrDescription(formData.name)) {
      errors.name =
        "Task name must be more than two characters and cannot be only numbers/symbols.";
    }

    if (!isValidNameOrDescription(formData.taskDescription)) {
      errors.description =
        "Description must be meaningful and cannot be only numbers/symbols.";
    }

    return errors;
  };

  const handleDeleteEmailInput = (index) => {
    const newInputList = [...inputList];
    const removedEmail = newInputList.splice(index, 1)[0];

    setFormData((prev) => ({
      ...prev,
      users: prev.users.filter((id) => id !== removedEmail.userId),
    }));

    setInputList(newInputList);
  };

  const handleEmailValidation = async (index) => {
    const email = inputList[index].value;
    const newInputList = [...inputList];
    newInputList[index].error = "";

    try {
      const response = await checkEmailExists({ email });
      if (response.userId) {
        if (response.userId === userId) {
          newInputList[index].error = "You cannot add your own email.";
        } else {
          setFormData((prev) => ({
            ...prev,
            users: prev.users.includes(response.userId)
              ? prev.users
              : [...prev.users, response.userId],
          }));
        }
      }
    } catch (error) {
      newInputList[index].error = "Invalid email";
      console.error("Error validating email:", error);
    }

    setInputList(newInputList);
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
      <form className="w-full max-w-screen-lg" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-4">
          {/* Left Column */}
          <div className="w-full md:w-1/2 px-4 md:px-8 lg:px-12">
            <label htmlFor="task">Task</label>
            <input
              value={formData.name}
              type="text"
              className="block w-full md:w-3/4 mb-4"
              onChange={(e) => {
                handleInputChange("name", e.target.value);
              }}
            />
            <label htmlFor="category">Category</label>
            <div className="w-3/4">
              <CreatableSelect
                isClearable
                isDisabled={isLoading}
                isLoading={isLoading}
                onChange={handleCategoryChange}
                onCreateOption={handleCreateCategory}
                options={categories}
                value={selectedCategory}
                placeholder="Select or create a category"
                styles={customStyles}
              />
              <label htmlFor="sub-category">Sub-Category</label>
              <CreatableSelect
                isClearable
                isDisabled={!selectedCategory || isLoading}
                isLoading={isLoading}
                onChange={handleSubcategoryChange}
                onCreateOption={handleCreateSubcategory}
                options={subcategories}
                value={selectedSubcategory}
                placeholder="Select or create a sub-category"
                styles={customStyles}
              />
            </div>
            <label htmlFor="priority">Priority</label>
            <input
              value={formData.priority}
              type="number"
              id="priority"
              name="quantity"
              min="1"
              max="5"
              className="block w-full md:w-3/4 mb-4"
              onChange={(e) => {
                handleInputChange("priority", e.target.value);
              }}
            />
            <label htmlFor="date" className="mt-10">
              <input
                checked={isSpecificDate}
                type="checkbox"
                className="size-4 align-middle"
                onChange={() => {
                  setIsSpecificDate(!isSpecificDate);
                }}
              />{" "}
              Specific date
            </label>
            <input
              value={formData.deadline}
              type="date"
              id="date"
              disabled={!isSpecificDate}
              className="mb-4 w-full md:w-3/4"
              onChange={(e) => {
                handleInputChange("deadline", e.target.value);
              }}
            />
            <label htmlFor="email" className="mt-10">
              Who will work with you on this task?
            </label>
            {inputList.map((input, index) => (
              <div key={index} className="flex flex-col mt-2">
                <div className="flex items-center">
                  <input
                    type="email"
                    value={input.value}
                    className="rounded-full w-3/4"
                    placeholder="user@example.com"
                    onChange={(e) => handleEmailChange(index, e.target.value)}
                    onBlur={() => handleEmailValidation(index)}
                  />
                  <button
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
            <button
              className="rounded-full px-3 mt-1"
              onClick={(e) => {
                e.preventDefault();
                onAddBtnClick();
              }}
            >
              + Add email
            </button>
          </div>

          {/* Right Column */}
          <div className="w-full md:w-1/2 px-4 md:px-8 lg:px-12">
            <label htmlFor="description">Description</label>
            <textarea
              value={formData.taskDescription}
              id="description"
              className="block w-full md:w-3/4"
              onChange={(e) => {
                handleInputChange("taskDescription", e.target.value);
              }}
            ></textarea>
            <label htmlFor="recurrence" className="mt-24">
              <input
                checked={isRecurrence}
                type="checkbox"
                className="size-4 align-middle"
                onChange={() => {
                  setIsRecurrence(!isRecurrence);
                }}
              />{" "}
              Recurrence
            </label>
            <div className="w-3/4">
              <Select
                placeholder="Select day(s) of the week"
                id="week"
                isDisabled={!isRecurrence}
                className="mb-4"
                isMulti
                options={daysOfWeekOptions}
                onChange={handleDayChange}
                value={daysOfWeekOptions.filter((option) =>
                  selectedDays.includes(option.value)
                )}
                styles={customStyles}
              />

              <Select
                placeholder="Select day(s) in the month"
                id="month"
                isDisabled={!isRecurrence}
                className="mb-4"
                isMulti
                options={daysOfMonthOptions}
                onChange={handleMonthDayChange}
                value={selectedMonthDays}
                styles={customStyles}
              />
            </div>
          </div>
        </div>
      </form>
      {/* Buttons */}
      <div className="flex justify-center mt-20">
        <button className="p-2 w-32 rounded-full m-2" onClick={handleDelete}>
          Delete
        </button>
        <button
          className="bg-mediumGreen text-white p-2 w-32 rounded-full m-2"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
      <div className="fixed bottom-4 right-4">
        <figure className="ml-1">
          <img src={linesBottom} alt="Task Zen design element" />
        </figure>
      </div>
    </div>
  );
}
