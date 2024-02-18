import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// import data from "../../data/tasks-example.json";
import { UserContext } from "../../contexts/UserContext";
import dataAPI from "../../services/dataAPI";
import Task from "./Task";

export default function ListTasks(props) {
  const navigate = useNavigate();
  const { dayWeek, dayMonth, calendarVue } = props;
  const { userId, setUserId, setUsername } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  const [listUserTasks, setListUserTasks] = useState([]);
  const [listUserCategories, setListUserCategories] = useState();
  const [listUserSubCategories, setListUserSubCategories] = useState();

  function checkToken() {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }

  useEffect(() => {
    checkToken();
    let getUserId = localStorage.getItem("userId");
    let getUserUsername = localStorage.getItem("username");
    setUserId(getUserId);
    setUsername(getUserUsername);

    const getAllData = async () => {
      const tasksData = await dataAPI.getTasks(getUserId);
      setListUserTasks(tasksData);

      const allCategories = await dataAPI.getCategories();

      const allSubCategories = await dataAPI.getSubCategories();

      const updatedCategories = [];
      const updatedSubCategories = [];

      tasksData?.forEach((task) => {
        allCategories.forEach((category) => {
          //check first if category in updatedcategories before continuing
          if (updatedCategories.includes(category)) {
            return;
          }

          category.subcategories.forEach((element) => {
            if (element._id === task.subcategory) {
              updatedCategories.push(category);
            }
          });
        });

        allSubCategories.forEach((subcategory) => {
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
  }, [userId]);

  const checkSubcategory = ({ category }) => {
    return category.subcategories.map((subcategoryInCategory, i) => {
      const matchingSubcategory = listUserSubCategories.find(
        (subcategory) => subcategoryInCategory._id === subcategory._id
      );

      // if (matchingSubcategory) {
      return matchingSubcategory ? (
        <div key={`${category.subcategories}/${i}`}>
          <h6 className="text-mediumGreen mt-2 font-medium">
            {matchingSubcategory.name}
          </h6>
          {checkTask(matchingSubcategory._id)}
        </div>
      ) : (
        <></>
      );
      // }
    });
  };

  const checkTask = (subcategoryId) => {
    return listUserTasks.map((task, i) => {
      return subcategoryId === task.subcategory ? (
        <div className="border-b-2 border-lightGreen relative group" key={i}>
          <Task
            key={i}
            taskId={task._id}
            taskName={task.name}
            taskDays={task.days}
            dayWeek={dayWeek}
            dayMonth={dayMonth}
            calendarVue={calendarVue}
          />
        </div>
      ) : (
        <></>
      );
    });
  };

  return (
    <section className="w-full">
      {isLoading && <p>Loading...</p>}
      {!isLoading ? (
        <div>
          {listUserCategories.map((category, i) => {
            return (
              <div key={i} className="w-full">
                <h5 className="text-darkGreen font-semibold mt-3">
                  {category.name}
                </h5>
                <div>{checkSubcategory({ category })}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </section>
  );
}
