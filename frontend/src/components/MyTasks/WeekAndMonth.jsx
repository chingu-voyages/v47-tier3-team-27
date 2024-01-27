import React, { useEffect } from "react";
import {
  renderListDaysPerMonth,
  renderListDaysPerWeek,
} from "../Date/DateInfo";

export default function WeekAndMonth(props) {
  const { updateVueCalendar } = props;
  const [dayMonth, setDayMonth] = React.useState([]);
  const [dayWeek, setDayWeek] = React.useState([]);
  useEffect(() => {
    getCalendar();
  }, []);

  const getCalendar = () => {
    setDayMonth(renderListDaysPerMonth());
    setDayWeek(renderListDaysPerWeek());
  };

  console.log(dayMonth);
  console.log(dayWeek);
  return (
    <section className="flex flex-col w-full">
      {updateVueCalendar === "month" ? (
        <div className="flex flex-col w-full items-end">
          {/* <div className="flex flex-row w-2/3 bg-lightGreen rounded	justify-evenly">
            {dayMonth.map((infoDateMonth) => {
              return (
                <div
                  key={infoDateMonth[0]}
                  className="flex flex-col m-px py-1 items-center text-xs "
                >
                  <p>{infoDateMonth[0]}</p>
                  <p>{infoDateMonth[1]}</p>
                </div>
              );
            })}
          </div> */}
        </div>
      ) : (
        <div className="flex flex-col w-full items-end">
          <div className="flex flex-row w-2/3 bg-lightGreen rounded	justify-evenly">
            {dayWeek.map((infoDateWeek) => {
              return (
                <div
                  key={infoDateWeek[0]}
                  className="flex flex-col m-px py-1 items-center text-xs "
                >
                  <p>{infoDateWeek[0]}</p>
                  <p>{infoDateWeek[1]}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
