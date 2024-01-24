import React from "react";

export default function DisplayMonth() {
  const today = new Date();
  console.log("today", today);

  const currentMonthIndex = today.getMonth();

  const currentYear = today.getFullYear();
  console.log("currentYear", currentYear);

  const listMonths = [
    "January",
    "February",
    "March",
    "April",
    "Mei",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const InitialNameDays = ["M", "T", "W", "Th", "F", "Sa", "S"];

  const FullNameDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const monthName = listMonths[currentMonthIndex];

  // get number of days in the month and render a component for each day
  const getDays = (year, month) => {
    return new Date(year, month, 0).getDate();
  };
  const numberOfDaysInMonth = getDays(currentYear, currentMonthIndex);

  const renderListDaysPerMonth = () => {
    const listDaysPerMonth = [];
    for (let i = 0; i < numberOfDaysInMonth; i++) {
      const getDayInNumber = new Date(today.getFullYear(), today.getMonth(), i);
      const getDayInName = getDayInNumber.getDay();
      listDaysPerMonth.push(
        <div key={i} className="flex flex-col mx-1	items-center			">
          <p>{InitialNameDays[getDayInName]}</p>
          <p>{i + 1}</p>
        </div>
      );
    }
    return listDaysPerMonth;
  };

  // get date of the day and calcul the days of the same week then render a component for each day

  const renderListDaysPerWeek = () => {
    const listDaysPerWeek = [];
    for (let i = 1; i <= 7; i++) {
      let first = today.getDate() - today.getDay() + i;
      console.log("first", first);
      let day = new Date(today.setDate(first));
      const getDayInName = day.getDay();

      console.log("day", day);
      listDaysPerWeek.push(
        <div key={i} className="flex flex-col mx-1	items-center			">
          <p>{FullNameDays[getDayInName]}</p>
          <p>{first}</p>
        </div>
      );
    }
    return listDaysPerWeek;
  };

  return (
    <section>
      <h2>{monthName}</h2>
      <div className="flex flex-row bg-lightGreen rounded">
        {renderListDaysPerMonth()}
      </div>
      <div className="flex flex-row bg-lightGreen rounded">
        {renderListDaysPerWeek()}
      </div>
    </section>
  );
}
