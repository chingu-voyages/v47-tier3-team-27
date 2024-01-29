import React from "react";
import Pen from "../../assets/pen.png";
import Text from "../../assets/text.png";

export default function Task(props) {
  const { taskName, taskDays, dayWeek, dayMonth, calendarVue } = props;

  const updateCalendarVue = (calendarVue) => {
    if (calendarVue === "month") {
      return handleCheckBoxesMonth(dayMonth);
    } else {
      return handleCheckBoxesWeek(dayWeek);
    }
  };

  const handleCheckBoxesWeek = (listDays) => {
    const listCheckboxes = [];
    listDays.forEach((day) => {
      if (
        taskDays.includes(day[0].toLowerCase()) ||
        taskDays.includes(day[1].toString())
      ) {
        listCheckboxes.push(
          <div className="w-2.5">
            <input type="checkbox" id={day} name="checkbox task" />
          </div>
        );
      } else {
        listCheckboxes.push(
          <div className="w-2.5" aria-hidden="true">
            p
          </div>
        );
      }
    });
    console.log("listCheckboxes", listCheckboxes);

    return listCheckboxes;
  };

  const handleCheckBoxesMonth = (listDays) => {
    const listCheckboxes = [];

    // get two first letters of days to compare them
    const daysAfterSlice = [];
    taskDays.forEach((taskDay) => {
      daysAfterSlice.push(taskDay.slice(0, 2));
    });

    listDays.forEach((day) => {
      if (
        daysAfterSlice.includes(day[0].toLowerCase()) ||
        taskDays.includes(day[1].toString())
      ) {
        listCheckboxes.push(
          <div className="w-2.5">
            <input type="checkbox" id={day} name="checkbox task" />
          </div>
        );
      } else {
        listCheckboxes.push(
          <div className="w-2.5" aria-hidden="true">
            p
          </div>
        );
      }
    });

    return listCheckboxes;
  };

  return (
    <div className="flex flex-row w-full justify-between">
      <span className="flex flex-row w-1/3 justify-between">
        <p className="text-darkGreen">{taskName}</p>
        <span className="flex flex-row">
          <button className="border-0">
            <img src={Pen} className="w-5	h-5" alt="update task" />
          </button>
          <button className="border-0">
            <img src={Text} className="w-5	h-5" alt="view history task" />
          </button>
        </span>
      </span>

      <span className="flex flex-row w-2/3 justify-evenly">
        {updateCalendarVue(calendarVue)}
      </span>
    </div>
  );
}
