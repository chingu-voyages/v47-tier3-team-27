import React, { useState } from "react";

export default function ButtonMonthWeek(props) {
  const { updateShowCalendar } = props;

  const [showWeek, setShowWeek] = useState(false);

  const updateState = () => {
    setShowWeek(!showWeek);
    updateShowCalendar();
  };

  return (
    <div className="flex flex-row">
      <button
        className={`border-2 border-mediumGreen rounded-l rounded-r-none p-1.5 ${
          !showWeek ? "bg-mediumGreen text-white" : ""
        }`}
        onClick={() => updateState()}
      >
        Month
      </button>

      <button
        className={`border-2 border-mediumGreen rounded-r rounded-l-none p-1.5 ${
          showWeek ? "bg-mediumGreen text-white" : ""
        }`}
        onClick={() => updateState()}
      >
        Week
      </button>
    </div>
  );
}
