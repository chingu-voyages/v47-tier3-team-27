import React from "react";
import {
  renderListDaysPerMonth,
  renderListDaysPerWeek,
} from "../Date/DateInfo";

export default function WeekAndMonth(props) {
  const { showWeekCalendar } = props;

  return (
    <section className="flex flex-col w-full">
      {!showWeekCalendar ? (
        <div className="flex flex-col w-full items-end">
          {/* <span className="flex flex-col w-2/3"> */}
          <div className="flex flex-row w-2/3 bg-lightGreen rounded	justify-evenly">
            {renderListDaysPerMonth()}
          </div>
          {/* </span> */}
        </div>
      ) : (
        <div className="flex flex-col w-full items-end">
          {/* <span className="flex w-2/3"> */}
          <div className="flex flex-row w-2/3 bg-lightGreen rounded	justify-evenly">
            {renderListDaysPerWeek()}
          </div>
          {/* </span> */}
        </div>
      )}
    </section>
  );
}
