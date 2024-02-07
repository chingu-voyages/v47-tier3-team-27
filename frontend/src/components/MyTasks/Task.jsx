import React from "react";
import Pen from "../../assets/pen.png";
import Log from "../Log";
import Invite from "../Invite";

export default function Task(props) {
  const { taskName, taskDays, dayWeek, dayMonth, calendarVue } = props;

  const handleCheckBoxesWeek = (dayWeek) => {
    const listCheckboxes = [];
    dayWeek.forEach((day) => {
      if (
        taskDays.includes(day[0].toLowerCase()) ||
        taskDays.includes(day[1].toString())
      ) {
        listCheckboxes.push(
          <div className="flex justify-center items-center" id={day}>
            <input
              type="checkbox"
              className="hidden peer"
              id={`custom ${day}`}
              name="checkbox task"
            />
            <label
              for={`custom ${day}`}
              className="flex justify-center items-center	m-0 p-0 cursor-pointer  select-none text-slate-400  
         before:h-3 before:w-3 
        before:rounded-full before:border 
        before:border-green-800 before:bg-white before:transition-[background-color] 
        before:duration-300 before:ease-in 
        peer-checked:before:bg-darkGreen 
        peer-checked:before:transition-[background-color] peer-checked:before:duration-300 peer-checked:before:ease-in"
            ></label>
          </div>
        );
      } else {
        listCheckboxes.push(<div></div>);
      }
    });

    return listCheckboxes;
  };

  const handleCheckBoxesMonth = (dayMonth) => {
    const listCheckboxes = [];

    // get two first letters of days to compare them
    const daysAfterSlice = [];
    taskDays.forEach((taskDay) => {
      daysAfterSlice.push(taskDay.slice(0, 2));
    });

    // we will need below to add the task ID to the input id and label for   id={`custom ${day} ${taskId}`}

    dayMonth.forEach((day) => {
      if (
        daysAfterSlice.includes(day[0].toLowerCase()) ||
        taskDays.includes(day[1].toString())
      ) {
        listCheckboxes.push(
          <div className="flex w-4 justify-between items-center" id={day}>
            <input
              type="checkbox"
              class="hidden peer"
              id={`custom ${day}`}
              name="checkbox task"
            />
            <label
              for={`custom ${day}`}
              className=" flex m-0 p-0 items-center justify-center cursor-pointer select-none text-slate-400 
         before:h-3 before:w-3 
         before:rounded-full before:border 
        before:border-green-800 before:bg-white before:transition-[background-color] 
        before:duration-300 before:ease-in 
        peer-checked:before:bg-darkGreen 
        peer-checked:before:transition-[background-color] peer-checked:before:duration-300 peer-checked:before:ease-in"
            ></label>
          </div>
        );
      } else {
        listCheckboxes.push(<div className="w-4"></div>);
      }
    });

    return listCheckboxes;
  };

  return (
    <div className="flex flex-row w-full justify-between">
      <div className="flex flex-row w-1/3 justify-between ">
        <p className="text-darkGreen self-center font-normal">{taskName}</p>
        <div className="flex flex-row">
          <button className="border-0">
            <img src={Pen} className="w-5	h-5" alt="update task" />
          </button>
          <Log />
          <Invite />
        </div>
      </div>
      {calendarVue === "week" ? (
        <div className="grid grid-cols-7 w-2/3">
          {handleCheckBoxesWeek(dayWeek)}
        </div>
      ) : (
        <div className="flex flex-row w-2/3 justify-between">
          {handleCheckBoxesMonth(dayMonth)}
        </div>
      )}
    </div>
  );
}
