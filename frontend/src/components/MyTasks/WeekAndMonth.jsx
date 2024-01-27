import React from "react";

export default function WeekAndMonth(props) {
  const { updateVueCalendar, dayMonth, dayWeek } = props;
  console.log("updateVueCalendar", updateVueCalendar);

  console.log(dayMonth);
  console.log(dayWeek);
  return (
    <section className="flex flex-col w-full">
      {updateVueCalendar === "month" ? (
        <div className="flex flex-col w-full items-end">
          <div className="flex flex-row w-2/3 bg-lightGreen rounded	justify-evenly">
            {dayMonth.map((dayInMonth) => {
              return (
                <div
                  key={dayInMonth[1]}
                  className="flex flex-col m-px py-1 items-center text-xs "
                >
                  <p>{dayInMonth[0]}</p>
                  <p>{dayInMonth[1]}</p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full items-end">
          <div className="flex flex-row w-2/3 bg-lightGreen rounded	justify-evenly">
            {dayWeek.map((dayInWeek) => {
              return (
                <div
                  key={dayInWeek[1]}
                  className="flex flex-col m-px py-1 items-center text-xs "
                >
                  <p>{dayInWeek[0]}</p>
                  <p>{dayInWeek[1]}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
