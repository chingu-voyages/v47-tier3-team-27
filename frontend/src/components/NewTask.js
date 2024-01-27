import React, { useEffect, useState } from "react";

export default function NewTask() {
  const [isDatePresent, setIsDatePresent] = useState(true);
  const [isRecurrencePresent, setIsRecurrencePresent] = useState(true);

  const days = new Date(2024, 1, 0).getDate();

  const Input = () => {
    return (
      <>
        <input
          className="rounded-full w-fit mt-1"
          placeholder="testing@testing.com"
        />
        <br />
      </>
    );
  };

  const [inputList, setInputList] = useState([]);

  const onAddBtnClick = (event) => {
    setInputList(inputList.concat(<Input key={inputList.length} />));
  };

  return (
    <div className="flex flex-col items-center m-auto">
      {/* Task Form */}
      <form className="w-full max-w-screen-lg">
        <div className="flex flex-wrap -mx-4">
          {/* Left Column */}
          <div className="w-full md:w-1/2 px-20 mb-4">
            <label htmlFor="task">Task</label>
            <input type="text" className="block w-full mb-4"></input>
            <label htmlFor="category">Category</label>
            <select id="category" className="block w-full mb-4">
              <option value="" disabled selected>
                Select an existing one
              </option>
            </select>
            <label htmlFor="sub-category">Sub-Category</label>
            <select id="sub-category" className="block w-full mb-4">
              <option value="" disabled selected>
                Select an existing one
              </option>
            </select>
            <label htmlFor="priority">Priority</label>
            <select id="priority" className="block w-full mb-4"></select>
            <label htmlFor="date" className="mt-10">
              <input
                type="checkbox"
                className="size-4 align-middle"
                onChange={() => {
                  setIsDatePresent(!isDatePresent);
                }}
              ></input>{" "}
              Specific date
            </label>
            <input
              type="date"
              id="date"
              disabled={isDatePresent}
              className="mb-4"
            ></input>
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
          <div className="w-full md:w-1/2 px-20 mb-4">
            <label htmlFor="description">Description</label>
            <textarea id="description" className="block w-full mb-4"></textarea>
            <label htmlFor="recurrence" className="mt-24">
              <input
                type="checkbox"
                className="size-4 align-middle"
                onChange={() => {
                  setIsRecurrencePresent(!isRecurrencePresent);
                }}
              ></input>{" "}
              Recurrence
            </label>
            <select id="week" disabled={isRecurrencePresent} className="mb-4">
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
            <select id="month" disabled={isRecurrencePresent}>
              <option value="" disabled selected>
                Select day(s) in the month
              </option>
              {[...Array(days).keys()].map((day) => (
                <option key={day + 1} value={day + 1}>
                  {day + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>

      {/* Save and Delete Buttons */}
      <div className="flex justify-center mt-5">
        <button className="p-2 w-32 rounded-full m-2">Delete</button>
        <button className="bg-mediumGreen text-white p-2 w-32 rounded-full m-2">
          Save
        </button>
      </div>
    </div>
  );
}
