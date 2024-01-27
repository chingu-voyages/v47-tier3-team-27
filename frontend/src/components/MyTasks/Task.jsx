import React from "react";
import CheckBox from "./Checkbox";

export default function Task(props) {
  const { taskName, taskDays } = props;
  return (
    <div className="flex flex-row">
      <span>
        <p className="text-darkGreen">{taskName}</p>
      </span>
      <span className="flex flex-row">
        {taskDays.map((day, i) => {
          return <CheckBox day={day} key={i} />;
        })}
      </span>
    </div>
  );
}
