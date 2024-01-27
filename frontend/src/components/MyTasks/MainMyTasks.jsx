import React, { useState, useEffect } from "react";
import WeekAndMonth from "./WeekAndMonth";
import ListTasks from "./ListTasks";
import ButtonMonthWeek from "./ButtonMonthWeek";
import { monthName } from "../Date/DateInfo";
import {
  renderListDaysPerMonth,
  renderListDaysPerWeek,
} from "../Date/DateInfo";

export default function MainMyTasks() {
  const [updateVueCalendar, setUpdateVueCalendar] = useState("month");
  const [dayMonth, setDayMonth] = React.useState([]);
  const [dayWeek, setDayWeek] = React.useState([]);

  useEffect(() => {
    getCalendar();
  }, []);

  const getCalendar = () => {
    setDayMonth(renderListDaysPerMonth());
    setDayWeek(renderListDaysPerWeek());
  };

  const updateShowCalendar = (newState) => {
    setUpdateVueCalendar(newState);
  };

  return (
    <section className="flex flex-col w-5/6">
      <span className="flex flex-row justify-between">
        <h2>{monthName}</h2>
        <ButtonMonthWeek updateShowCalendar={updateShowCalendar} />
      </span>
      <WeekAndMonth
        updateVueCalendar={updateVueCalendar}
        dayWeek={dayWeek}
        dayMonth={dayMonth}
      />
      <ListTasks />
    </section>
  );
}
