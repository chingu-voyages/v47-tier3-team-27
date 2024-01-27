import React, { useState } from "react";
import WeekAndMonth from "./WeekAndMonth";
import ListTasks from "./ListTasks";
import ButtonMonthWeek from "./ButtonMonthWeek";
import { monthName } from "../Date/DateInfo";

export default function MainMyTasks() {
  const [updateVueCalendar, setUpdateVueCalendar] = useState("month");

  const updateShowCalendar = (newState) => {
    setUpdateVueCalendar(newState);
  };

  return (
    <section className="flex flex-col w-5/6">
      <span className="flex flex-row justify-between">
        <h2>{monthName}</h2>
        <ButtonMonthWeek updateShowCalendar={updateShowCalendar} />
      </span>
      <WeekAndMonth updateVueCalendar={updateVueCalendar} />
      <ListTasks />
    </section>
  );
}
