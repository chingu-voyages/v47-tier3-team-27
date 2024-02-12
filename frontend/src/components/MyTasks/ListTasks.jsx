import React, { useEffect, useState } from "react";
// import data from "../../data/tasks-example.json";
import Task from "./Task";
import SubCategory from "./SubCategory";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import dataAPI from "../../services/dataAPI";

export default function ListTasks(props) {
  const { dayWeek, dayMonth, calendarVue } = props;
  const { userId } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  const [listUserTasks, setListUserTasks] = useState([]);
  const [listUserCategories, setListUserCategories] = useState();
  const [listUserSubCategories, setListUserSubCategories] = useState();

  useEffect(() => {
    const getAllData = async () => {
      const tasksData = await dataAPI.getTasks(userId);
      setListUserTasks(tasksData);

      const allCategories = await dataAPI.getCategories();

      const allSubCategories = await dataAPI.getSubCategories();

      const updatedCategories = [];
      const updatedSubCategories = [];

      tasksData.forEach((task) => {
        allCategories.map((category) => {
          //check first if category in updatedcategories before continuing
          if (updatedCategories.includes(category)) {
            return;
          }

          category.subcategories.map((element) => {
            if (element._id === task.subcategory) {
              updatedCategories.push(category);
            }
          });
        });

        allSubCategories.map((subcategory) => {
          if (task.subcategory === subcategory._id) {
            updatedSubCategories.push(subcategory);
          }
        });
      });

      setListUserCategories(updatedCategories);
      setListUserSubCategories(updatedSubCategories);
      setIsLoading(false);
    };
    getAllData();
  }, []);

  const getActivityTypes = (activityTypes) => {
    let results = [];
    for (let i = 0; i < activityTypes.length; i++) {
      const getActivityInfo = activityTypes[i];

      results.push(
        <>
          <SubCategory activityName={getActivityInfo.activityName} key={i} />
          <>
            {getActivityInfo.Tasks.map((task, i) => {
              return (
                <div
                  className="border-b-2 border-lightGreen relative group"
                  key={i}
                >
                  <Task
                    key={i}
                    taskName={task.taskName}
                    taskDays={task.days}
                    dayWeek={dayWeek}
                    dayMonth={dayMonth}
                    calendarVue={calendarVue}
                  />
                </div>
              );
            })}
          </>
        </>
      );
    }

    return results;
  };

  const checkSubcategory = ({ category }) => {
    return category.subcategories.map((subcategoryInCategory) => {
      const matchingSubcategory = listUserSubCategories.find((subcategory) => {
        return subcategoryInCategory._id === subcategory._id;
      });

      if (matchingSubcategory) {
        return (
          <div>
            <h6 className="text-darkGreen font-semibold mt-3">
              {matchingSubcategory.name}
            </h6>
            {checkTask(matchingSubcategory._id)}
          </div>
        );
      }
    });
  };

  const checkTask = (subcategoryId) => {
    return listUserTasks.map((task) => {
      if (subcategoryId === task.subcategory) {
        return <p>{task.name}</p>;
      }
    });
  };

  return (
    <section className="w-full">
      {isLoading && <p>wait</p>}
      {!isLoading ? (
        <div>
          {listUserCategories.map((category, i) => {
            return (
              <div className="w-full">
                <h5 key={i} className="text-darkGreen font-semibold mt-3">
                  {category.name}
                </h5>
                <div>{checkSubcategory({ category })}</div>
                {/* <>{getActivityTypes(category.activityTypes)}</> */}
              </div>
            );
          })}
        </div>
      ) : (
        <p>nothing to show</p>
      )}
    </section>
  );
}
