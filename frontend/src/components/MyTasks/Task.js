import React from "react";
import CheckBox from "./Checkbox";

export default function Task(props) {
  const { taskName, taskDays } = props;
  console.log("taskDays", taskDays);
  return (
    <>
      <p className="text-darkGreen">{taskName}</p>
    </>
  );
}
