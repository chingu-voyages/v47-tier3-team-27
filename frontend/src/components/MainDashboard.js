import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import image from "../assets/Notebook-bro.png";
import linesTop from "../assets/greenLinesTop.png";
import linesBottom from "../assets/greenLinesBottom.png";
import Log from "./Log";
import dataAPI from "../services/dataAPI";
import Text from "../assets/text.png";

import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const moment = require("moment");

export default function MainDashboard() {
  const { username, setUsername, setUserId } = useContext(UserContext);

  const navigate = useNavigate();

  const [tasks, setTaks] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const currentDate = moment();

  const formattedDate = currentDate.format("dddd, Do MMMM");

  function checkToken() {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }

  const getAllData = async () => {
    const userId = localStorage.getItem("userId");
    const tasksData = await dataAPI.getDailyTasks(userId);
    setIsLoading(false);
    setTaks(tasksData);
  };

  useEffect(() => {
    const getUserId = localStorage.getItem("userId");
    const getUserName = localStorage.getItem("username");

    setUserId(getUserId);
    setUsername(getUserName);

    checkToken();
    getAllData();
  }, []);

  return (
    <section className="w-full h-full relative">
      <figure className="absolute right-0 top-[-2rem] z-0">
        <img className="h-[210px] opacity-30 md:opacity-100" src={image} />
      </figure>
      <div className="relative z-1">
        <h2>Welcome back, {username}!</h2>
      </div>
      <p className="relative z-1 inter font-semibold text-lg mb-8">
        {formattedDate}
      </p>
      <div className="relative z-1 pb-8 mb-8">
        <figure className="absolute top-0 left-0 z-0">
          <img src={linesTop} alt="Task Zen design element" />
        </figure>
        <figure className="absolute bottom-0 right-0 z-0">
          <img src={linesBottom} alt="Task Zen design element" />
        </figure>
        <div className="pt-8 px-8">
          <p className="uppercase text-lg">Task of the day</p>
          {isLoading && <p>Loading...</p>}

          {tasks?.length > 0 && !isLoading && (
            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {tasks.map((task) => (
                <article className="p-4 border border-solid border-mediumGreen shadow-md rounded-xl h-[150px] hover:bg-mediumGreen10">
                  <div className="flex justify-between align-baseline pb-2">
                    <p className="font-medium">{task.name}</p>
                    <Log taskId={task._id}>
                      <div className="cursor-pointer max-w-7">
                        <img
                          src={Text}
                          alt="click to open a log of this taks's changes history"
                        />
                      </div>
                    </Log>
                  </div>
                  <hr className="text-gray-400" />
                  <p className="task-description mt-2 text-sm">
                    {task.taskDescription}
                  </p>
                </article>
              ))}
            </div>
          )}

          {tasks?.length === 0 && !isLoading && <p>There are no daily tasks</p>}
        </div>
        <div className="pt-8 px-8 mt-4">
          <p className="uppercase text-lg">Recent updates</p>
          <div className="mt-4 grid gap-3">
            <article className="p-4 flex flex-row justify-between border border-solid border-mediumGreen shadow-md rounded-xl hover:bg-mediumGreen10">
              <p>Task name</p>
              <div className="flex gap-4">
                <p>Status</p>
                <p>Date</p>
              </div>
            </article>
            <article className="p-4 flex flex-row justify-between border border-solid border-mediumGreen shadow-md rounded-xl hover:bg-mediumGreen10">
              <p>Task name</p>
              <div className="flex gap-4">
                <p>Status</p>
                <p>Date</p>
              </div>
            </article>
            <article className="p-4 flex flex-row justify-between border border-solid border-mediumGreen shadow-md rounded-xl hover:bg-mediumGreen10">
              <p>Task name</p>
              <div className="flex gap-4">
                <p>Status</p>
                <p>Date</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
