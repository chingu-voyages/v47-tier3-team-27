import React, { useState } from "react";
import linesBottom from "../assets/greenLinesBottom.png";

export default function NewTask() {
  const [isSpecificDate, setIsSpecificDate] = useState(true);
  const [isRecurrence, setIsRecurrence] = useState(true);
  const [inputList, setInputList] = useState([]);

  const daysInMonth = new Date(2024, 1, 0).getDate();

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

  return (
    <div className="flex flex-col items-center ml-20">
      <form className="w-full max-w-screen-lg">
        <div className="flex flex-wrap -mx-4">
          {/* Left Column */}
          <div className="w-full md:w-1/2 px-4 md:px-8 lg:px-12">
            <label htmlFor="task">Task</label>
            <input type="text" className="block w-3/4 mb-4" />
            <label htmlFor="category">Category</label>
            <select id="category" className="block w-3/4 mb-4">
              <option value="" disabled selected>
                Select an existing one
              </option>
            </select>
            <label htmlFor="sub-category">Sub-Category</label>
            <select id="sub-category" className="block w-3/4 mb-4">
              <option value="" disabled selected>
                Select an existing one
              </option>
            </select>
            <label htmlFor="priority">Priority</label>
            <select id="priority" className="block w-3/4 mb-4"></select>
            <label htmlFor="date" className="mt-10">
              <input
                type="checkbox"
                className="size-4 align-middle"
                onChange={() => {
                  setIsSpecificDate(!isSpecificDate);
                }}
              />{" "}
              Specific date
            </label>
            <input
              type="date"
              id="date"
              disabled={isSpecificDate}
              className="mb-4 w-3/4"
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
            <textarea id="description" className="block w-3/4"></textarea>
            <label htmlFor="recurrence" className="mt-24">
              <input
                type="checkbox"
                className="size-4 align-middle"
                onChange={() => {
                  setIsRecurrence(!isRecurrence);
                }}
              />{" "}
              Recurrence
            </label>
            <select id="week" disabled={isRecurrence} className="mb-4">
              <option value="" disabled selected>
                Select day(s) of the week
              </option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
            <select id="month" disabled={isRecurrence}>
              <option value="" disabled selected>
                Select day(s) in the month
              </option>
              {[...Array(daysInMonth).keys()].map((day) => (
                <option key={day + 1} value={day + 1}>
                  {day + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>

      {/* Buttons */}
      <div className="flex justify-center mt-20">
        <button className="p-2 w-32 rounded-full m-2">Delete</button>
        <button className="bg-mediumGreen text-white p-2 w-32 rounded-full m-2">
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
