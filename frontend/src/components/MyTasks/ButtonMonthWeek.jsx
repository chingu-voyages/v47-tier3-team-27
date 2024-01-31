import React, { useState } from "react";

export default function ButtonMonthWeek(props) {
  const { updateShowCalendar } = props;

  const [changeVue, setChangeVue] = useState("month");

  const updateState = (newState) => {
    setChangeVue(newState);
    updateShowCalendar(newState);
  };

  return (
    <div className="flex flex-row items-center">
      <button
        className={`border-2 border-mediumGreen rounded-l rounded-r-none p-1.5 h-11 ${
          changeVue === "month" ? "bg-mediumGreen text-white" : ""
        }`}
        onClick={() => updateState("month")}
      >
        Month
      </button>

      <button
        className={`border-2 border-mediumGreen rounded-r rounded-l-none p-1.5 h-11 ${
          changeVue === "week" ? "bg-mediumGreen text-white" : ""
        }`}
        onClick={() => updateState("week")}
      >
        Week
      </button>
    </div>
  );
}
