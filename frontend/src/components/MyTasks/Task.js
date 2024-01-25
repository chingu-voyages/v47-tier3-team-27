import React from "react";
import CheckBox from "./Checkbox";

export default function Task(props) {
  const { taskName, taskDays } = props;
  console.log("taskDays", taskDays);
  return (
    <div className="flex flex-row">
      <span>
        <p className="text-darkGreen">{taskName}</p>
      </span>
      <span className="flex flex-row">
        {taskDays.map((day) => {
          return <CheckBox day={day} />;
        })}
      </span>
    </div>
  );
}
