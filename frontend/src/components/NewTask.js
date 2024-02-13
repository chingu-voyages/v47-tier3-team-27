import React, { useState } from "react";
import linesBottom from "../assets/greenLinesBottom.png";
import {
  addTask,
  getCategories,
  addCategory,
  addSubCategory,
} from "../utils/api";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useEffect } from "react";
import Select from "react-select";

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

  const onAddBtnClick = () => {
    setInputList([
      ...inputList,
      <input
        key={inputList.length}
        className="rounded-full w-fit mt-1"
        placeholder="testing@testing.com"
      />,
    ]);
  };

  const daysOfMonthOptions = [...Array(daysInMonth).keys()].map((day) => ({
    value: day + 1,
    label: `${day + 1}`,
  }));

  const daysOfWeekOptions = [
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
    { value: "Sunday", label: "Sunday" },
  ];

  const handleDayChange = (selectedOptions) => {
    setSelectedDays(selectedOptions.map((option) => option.value));
  };

  const handleMonthDayChange = (selectedOptions) => {
    setSelectedMonthDays(selectedOptions);
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
  };
  const handleInputChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !isRecurrence ||
      !formData.days ||
      selectedDays.length === 0 ||
      selectedMonthDays.length === 0 ||
      !isSpecificDate ||
      !formData.deadline ||
      formData.deadline.length === 0 ||
      !formData.name ||
      !formData.category ||
      !formData.priority ||
      !formData.taskDescription ||
      !formData.subcategory
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      const updatedFormData = {
        ...formData,
        days: [...selectedDays, ...selectedMonthDays.map((day) => day.value)],
      };

      const { category, ...formDataWithoutCategory } = updatedFormData;

      await addTask(formDataWithoutCategory);

      setFormData({
        name: "",
        taskDescription: "",
        priority: "",
        category: "",
        subcategory: "",
        deadline: "",
        users: [userId],
        days: [],
      });
      setIsSpecificDate(false);
    } catch (error) {
      console.error("Error adding task:", error);
    }
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
                id="week"
                isDisabled={!isRecurrence}
                className="mb-4"
                isMulti
                options={daysOfWeekOptions}
                onChange={handleDayChange}
                value={daysOfWeekOptions.filter((option) =>
                  selectedDays.includes(option.value)
                )}
              />
              <Select
                id="month"
                isDisabled={!isRecurrence}
                className="mb-4"
                isMulti
                options={daysOfMonthOptions}
                onChange={handleMonthDayChange}
                value={selectedMonthDays}
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
