import React from "react";

export default function WeekAndMonth(props) {
  const { updateVueCalendar, dayMonth, dayWeek } = props;

  return (
    <section className="flex flex-col w-full">
      {updateVueCalendar === "month" ? (
        <div className="flex flex-col w-full items-end">
          <div className="flex flex-row w-2/3 h-12 bg-lightGreen rounded	justify-between items-center">
            {dayMonth.map((dayInMonth) => {
              return (
                <div
                  key={dayInMonth[1]}
                  className="flex flex-col m-px py-1 items-center text-xs "
                >
                  <p className="text-xs">{dayInMonth[0]}</p>
                  <p className="text-xs">{dayInMonth[1]}</p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full items-end">
          <div className="grid grid-cols-7 w-2/3 h-12 bg-lightGreen rounded">
            {dayWeek.map((dayInWeek) => {
              return (
                <div
                  key={dayInWeek[1]}
                  className="flex flex-col m-px py-1 items-center text-xs"
                >
                  <p className="text-sm">{dayInWeek[0]}</p>
                  <p className="text-sm">{dayInWeek[1]}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
