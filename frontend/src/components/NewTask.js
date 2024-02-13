import React, { useState, useContext, useEffect } from "react";
import Select from "react-select";
import { addTask, getCategories } from "../utils/api";
import { UserContext } from "../contexts/UserContext";
import linesBottom from "../assets/greenLinesBottom.png";

export default function NewTask() {
  const [isSpecificDate, setIsSpecificDate] = useState(false);
  const [isRecurrence, setIsRecurrence] = useState(false);
  const [inputList, setInputList] = useState([]);
  const { userId } = useContext(UserContext);
  const daysInMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  ).getDate();

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
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

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    const selectedCategory = categories.find(
      (category) => category._id === selectedCategoryId
    );
    if (selectedCategory) {
      setSubcategories(selectedCategory.subcategories);
      setFormData((prevData) => ({
        ...prevData,
        category: selectedCategoryId,
        subcategory: "",
      }));
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res);
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
    if (isRecurrence && days.length === 0) {
      alert("Please select recurrence days.");
      return;
    }

    if (isSpecificDate && !formData.deadline) {
      alert("Please specify a deadline.");
      return;
    }

    const taskData = {
      ...formData,
      days,
      deadline: isSpecificDate ? formData.deadline : null,
    };

    try {
      await addTask(taskData);
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
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const onAddBtnClick = () => {
    setInputList(
      inputList.concat(
        <input
          key={inputList.length}
          className="rounded-full w-fit mt-1"
          placeholder="testing@testing.com"
        />
      )
    );
  };

  const handleDelete = () => {
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
            <select
              id="category"
              className="block w-full md:w-3/4 mb-4"
              onChange={handleCategoryChange}
              value={formData.category}
            >
              <option value="" disabled selected>
                Select an existing one
              </option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            <label htmlFor="sub-category">Sub-Category</label>
            <select
              id="sub-category"
              className="block w-full md:w-3/4 mb-4"
              value={formData.subcategory}
              onChange={(e) => {
                handleInputChange("subcategory", e.target.value);
              }}
            >
              <option value="" disabled selected>
                Select an existing one
              </option>
              {subcategories.map((subcategory) => (
                <option key={subcategory._id} value={subcategory._id}>
                  {subcategory.name}
                </option>
              ))}
            </select>
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
            </label>{" "}
            {inputList}
            <button
              className="rounded-full px-3 mt-1"
              onClick={(e) => {
                e.preventDefault();
                onAddBtnClick();
              }}
            >
              + add email
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
