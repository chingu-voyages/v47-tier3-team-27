import { createContext, useState } from "react";

export const UserContext = createContext({
  username: "",
  setUsername: () => {},
  userId: "",
  setUserId: () => {},
  userTasks: [],
  setUserTasks: () => {},
});

export const UserProvider = (props) => {
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [userTasks, setUserTasks] = useState([]);

  const value = {
    userId,
    setUserId,
    username,
    setUsername,
    userTasks,
    setUserTasks,
  };
  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};
