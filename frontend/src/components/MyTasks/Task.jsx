import React, { useContext, useMemo, useState } from "react";
import { UserContext } from "../../contexts/UserContext";

import dataAPI from "../../services/dataAPI";
import Pen from "../../assets/pen.png";
import More from "../../assets/more.png";

import Log from "../Log";
import Invite from "../Invite";
import Text from "../../assets/text.png";
import EditTask from "../EditTask";

export default function Task(props) {
  const { taskName, taskId, taskDays, dayWeek, dayMonth, calendarVue } = props;
  const { userId, username } = useContext(UserContext);

  const [show, setShow] = useState(false);
  const [statusTask, setStatusTask] = useState("To complete");

  const handleCheckboxClicked = () => {
    if (statusTask === "To complete") {
      setStatusTask(`Completed by {${username}`);
    } else {
      setStatusTask("To complete");
    }
    handleLogSubmit(`Completed by ${username}`);
  };
  const handleLogSubmit = async (logDescription) => {
    try {
      const response = await dataAPI.addLog(userId, taskId, logDescription);
      if (response) {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkboxesWeek = useMemo(() => {
    return dayWeek.map((day) => {
      if (taskDays.includes(day[0]) || taskDays.includes(day[1])) {
        return (
          <form
            onClick={handleCheckboxClicked}
            className="flex justify-center items-center"
            key={day}
            id={day}
          >
            <input
              type="checkbox"
              className="hidden peer"
              id={`custom ${day} ${taskId}`}
              name="checkbox task"
            />
            <label
              htmlFor={`custom ${day} ${taskId}`}
              className="flex justify-center items-center	m-0 p-0 cursor-pointer  select-none text-slate-400  
                before:h-3 before:w-3 
                before:rounded-full before:border 
                before:border-green-800 before:bg-white before:transition-[background-color] 
                before:duration-300 before:ease-in 
                peer-checked:before:bg-darkGreen 
                peer-checked:before:transition-[background-color] peer-checked:before:duration-300 peer-checked:before:ease-in"
            ></label>
          </form>
        );
      } else {
        return <div key={day}></div>;
      }
    });
  }, [taskDays, dayWeek, taskId]);

  // const handleCheckBoxesWeek = (dayWeek) => {
  //   const listCheckboxes = [];
  //   dayWeek.forEach((day) => {
  //     if (
  //       taskDays.includes(day[0].toLowerCase()) ||
  //       taskDays.includes(day[1].toString())
  //     ) {
  //       listCheckboxes.push(
  //         <div className="flex justify-center items-center" key={day} id={day}>
  //           <input
  //             type="checkbox"
  //             className="hidden peer"
  //             id={`custom ${day} ${taskId}`}
  //             name="checkbox task"
  //           />
  //           <label
  //             htmlFor={`custom ${day} ${taskId}`}
  //             className="flex justify-center items-center	m-0 p-0 cursor-pointer  select-none text-slate-400
  //        before:h-3 before:w-3
  //       before:rounded-full before:border
  //       before:border-green-800 before:bg-white before:transition-[background-color]
  //       before:duration-300 before:ease-in
  //       peer-checked:before:bg-darkGreen
  //       peer-checked:before:transition-[background-color] peer-checked:before:duration-300 peer-checked:before:ease-in"
  //           ></label>
  //         </div>
  //       );
  //     } else {
  //       listCheckboxes.push(<div></div>);
  //     }
  //   });

  //   return listCheckboxes;
  // };

  const checkBoxesMonth = useMemo(() => {
    // get two first letters of days to compare them
    const daysAfterSlice = [];

    if (isNaN(taskDays[0])) {
      taskDays.forEach((taskDay) => {
        return daysAfterSlice.push(taskDay.slice(0, 2).toLowerCase());
      });
    }

    return dayMonth.map((day, i) => {
      if (
        daysAfterSlice.includes(day[0].toLowerCase()) ||
        taskDays.includes(day[1])
      ) {
        return (
          <form
            onClick={handleCheckboxClicked}
            className="flex w-4 justify-between items-center"
            key={i}
            id={day}
          >
            <input
              type="checkbox"
              className="hidden peer"
              id={`custom ${day} ${taskId}`}
              name="checkbox task"
            />
            <label
              htmlFor={`custom ${day} ${taskId}`}
              className=" flex m-0 p-0 items-center justify-center cursor-pointer select-none text-slate-400 
         before:h-3 before:w-3 
         before:rounded-full before:border 
        before:border-green-800 before:bg-white before:transition-[background-color] 
        before:duration-300 before:ease-in 
        peer-checked:before:bg-darkGreen 
        peer-checked:before:transition-[background-color] peer-checked:before:duration-300 peer-checked:before:ease-in"
            ></label>
          </form>
        );
      } else {
        return <div className="w-4" key={i}></div>;
      }
    });
  }, [taskDays, dayMonth, taskId]);

  return (
    <div className="ml-1 flex flex-row w-full justify-between gap-3">
      <div className="flex flex-row w-1/3 justify-between gap-2">
        <p className="text-darkGreen self-center font-normal">{taskName}</p>
        <div className="flex flex-row items-center justify-center relative">
          <button
            onClick={() => setShow(!show)}
            className="!border-none w-8 h-8 bg-lightGreen opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <img src={More} alt="More icon" />
          </button>
          <div
            className={`absolute min-w-40 bg-white shadow-md border border-mediumGreen top-8 right-1 z-10 rounded-md ${
              show ? "block" : "hidden"
            }`}
          >
            <div className="w-full cursor-pointer">
              <EditTask taskInfo={props}>
                <div className="text-sm p-2 hover:bg-lightGreen flex items-center gap-2">
                  <img src={Pen} className="w-4	h-4" alt="update task" />
                  <span>Edit task</span>
                </div>
              </EditTask>
              <Log taskId={taskId}>
                <div className="text-sm p-2 hover:bg-lightGreen flex items-center gap-2">
                  <img
                    src={Text}
                    className="w-4	h-4"
                    alt="click to open a log of this taks's changes history"
                  />
                  <span>View log</span>
                </div>
              </Log>
              <Invite />
            </div>
          </div>
        </div>
      </div>
      {calendarVue === "week" ? (
        <div className="grid grid-cols-7 w-2/3">{checkboxesWeek}</div>
      ) : (
        <div className="flex flex-row w-2/3 justify-between">
          {checkBoxesMonth}
        </div>
      )}
    </div>
  );
}
