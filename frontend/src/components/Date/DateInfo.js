export const today = new Date();

export const currentMonthIndex = today.getMonth();

const currentYear = today.getFullYear();

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

const InitialNameDays = ["S", "M", "T", "W", "Th", "F", "Sa"];

const FullNameDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const monthName = listMonths[currentMonthIndex];

// get number of days in the month and render a component for each day

// getDate returns the day of the month for a date (ex: 19), and set to 0 it return the last day of the previous month. 'currentMonthIndex + 1' allows to get the number of day of the current month.

const numberOfDaysInMonth = new Date(
  currentYear,
  currentMonthIndex + 1,
  0
).getDate();

export const renderListDaysPerMonth = () => {
  const listDaysPerMonth = [];
  for (let i = 1; i <= numberOfDaysInMonth; i++) {
    const getDayOfTheMonthInNumber = new Date(
      currentYear,
      currentMonthIndex,
      i
    );

    // getDay returns the day of the week for this date (ex: 0 for sunday)
    const getDayInName = getDayOfTheMonthInNumber.getDay();
    const nameDay = InitialNameDays[getDayInName];

    listDaysPerMonth.push([nameDay, i]);
  }
  return listDaysPerMonth;
};

// get date of the day and calcul the days of the same week then render a component for each day

export const renderListDaysPerWeek = () => {
  const listDaysPerWeek = [];
  listDaysPerWeek.length = 0;
  let firstDayWeek = today.getDate() - today.getDay() + 1;
  console.log("listDaysPerWeek", listDaysPerWeek);
  for (let i = 1; i <= 7; i++) {
    const nextDate = today.setDate(today.getDate() + 1);
    // during first loop get the first day of the week, then the following days
    console.log("today.getDate()", today.getDate());
    console.log("dayWeek", dayWeek);
    let day = new Date(today.setDate(dayWeek));

    console.log("day", day);
    // get the number (0-6) of the day
    const getDayInNumber = day.getDay();
    const nameDay = FullNameDays[getDayInNumber];
    listDaysPerWeek.push([nameDay, dayWeek]);
    console.log("listDaysPerWeek", listDaysPerWeek);
  }
  return listDaysPerWeek;
};
