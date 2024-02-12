import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

const getCategories = async () => {
  try {
    const response = await api.get("/categories/all");
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const addTask = async (taskData) => {
  console.log("taskData:", taskData);
  try {
    const response = await api.post("/tasks", taskData);
    console.log("response:", response);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getCategories, addTask };
