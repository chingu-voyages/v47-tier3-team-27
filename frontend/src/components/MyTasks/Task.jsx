import React from "react";
import Pen from "../../assets/pen.png";
import Text from "../../assets/text.png";

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
          <div className="flex" id={day}>
            <input
              type="checkbox"
              class="hidden peer"
              id={`custom ${day}`}
              name="checkbox task"
            />
            <label
              for={`custom ${day}`}
              class="relative flex h-3  cursor-pointer pl-8 select-none text-slate-400 
        before:absolute before:left-0 before:flex before:h-3 before:w-3 
        before:items-center before:justify-center before:rounded-full before:border 
        before:border-green-800 before:bg-white before:transition-[background-color] 
        before:duration-300 before:ease-in before:content-[''] 
        peer-checked:before:bg-darkGreen peer-checked:before:text-green-800 
        peer-checked:before:content-[''] peer-checked:before:font-bold 
        peer-checked:before:transition-[background-color] peer-checked:before:duration-300 peer-checked:before:ease-in"
            ></label>
          </div>
        );
      } else {
        listCheckboxes.push(<div></div>);
      }
    });
    console.log("listCheckboxes", listCheckboxes);

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
          <div className="flex w-2.5 self-center" id={day}>
            <input
              type="checkbox"
              class="hidden peer"
              id={`custom ${day}`}
              name="checkbox task"
            />
            <label
              for={`custom ${day}`}
              class="relative flex h-3 cursor-pointer pl-8 select-none text-slate-400 
        before:absolute before:left-0 before:flex before:h-3 before:w-3 
        before:items-center before:justify-center before:rounded-full before:border 
        before:border-green-800 before:bg-white before:transition-[background-color] 
        before:duration-300 before:ease-in before:content-[''] 
        peer-checked:before:bg-darkGreen peer-checked:before:text-green-800 
        peer-checked:before:content-[''] peer-checked:before:font-bold 
        peer-checked:before:transition-[background-color] peer-checked:before:duration-300 peer-checked:before:ease-in"
            ></label>
          </div>
        );
      } else {
        listCheckboxes.push(<div className="w-2.5"></div>);
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
          <button className="border-0">
            <img src={Text} className="w-5	h-5" alt="view history task" />
          </button>
        </div>
      </div>
      {calendarVue === "week" ? (
        <div className="grid grid-cols-7 w-2/3">
          {handleCheckBoxesWeek(dayWeek)}
        </div>
      ) : (
        <div className="flex flex-row w-2/3 justify-evenly">
          {handleCheckBoxesMonth(dayMonth)}
        </div>
      )}
    </div>
  );
}
