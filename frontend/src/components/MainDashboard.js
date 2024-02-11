import React from "react";
import image from "../assets/Notebook-bro.png";
import linesTop from "../assets/greenLinesTop.png";
import linesBottom from "../assets/greenLinesBottom.png";
import Log from "./Log";

import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function MainDashboard() {
  const { userId, username, userTasks } = useContext(UserContext);

  console.log("userId in mainDashboard", userId);
  console.log("username in mainDashboard", username);

  console.log("userTasks in mainDashboard", userTasks);

  return (
    <section className="w-full h-full relative">
      <figure className="absolute right-0 top-[-2rem] z-0">
        <img className="h-[210px] opacity-30 md:opacity-100" src={image} />
      </figure>
      <div className="relative z-1">
        <h2>Welcome back, {username}!</h2>
      </div>
      <p className="relative z-1 inter font-semibold text-lg mb-8">
        Monday, 25th January /
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
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <article className="p-4 border border-solid border-mediumGreen shadow-md rounded-xl h-[150px] hover:bg-mediumGreen10">
              <div className="flex justify-between align-baseline pb-2">
                <p className="font-medium">Task name</p>
                <Log />
              </div>
              <hr className="text-gray-400" />
              <p className="task-description mt-2 text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia,
                accusantium atque, ipsum unde laudantium commodi sit alias,
                aliquam repellendus distinctio minima. Rerum aliquid
                voluptatibus nobis modi mollitia nesciunt, culpa laboriosam.
              </p>
            </article>
          </div>
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
