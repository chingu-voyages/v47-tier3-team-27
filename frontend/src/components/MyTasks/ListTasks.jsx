import React from "react";
import data from "../../data/tasks-example.json";
import Task from "./Task";
import SubCategory from "./SubCategory";

export default function ListTasks() {
  const getActivityTypes = (activityTypes) => {
    let results = [];
    for (let i = 0; i < activityTypes.length; i++) {
      const getActivityInfo = activityTypes[i];

      results.push(
        <>
          <SubCategory activityName={getActivityInfo.activityName} />
          <>
            {getActivityInfo.Tasks.map((task, i) => {
              return (
                <Task key={i} taskName={task.taskName} taskDays={task.days} />
              );
            })}
          </>
        </>
      );
    }
    return results;
  };

  return (
    <section className="w-1/3">
      {data.map((category, i) => (
        <div>
          <h5 key={i} className="text-darkGreen">
            {category.categoryName}
          </h5>
          <>{getActivityTypes(category.activityTypes)}</>
        </div>
      ))}
    </section>
  );
}
