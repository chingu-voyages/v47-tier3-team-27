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

const addCategory = async (categoryData) => {
  console.log("categoryData:", categoryData);
  try {
    const response = await api.post("/categories/add", categoryData);
    console.log("response:", response);

    return response.data;
  } catch (error) {
    throw error;
  }
};

const addSubCategory = async (subCategoryData) => {
  console.log("subCategoryData:", subCategoryData);
  try {
    const response = await api.post("/subcategories/add", subCategoryData);
    console.log("response:", response);

    return response.data;
  } catch (error) {
    throw error;
  }
};

const checkEmailExists = async (email) => {
  console.log("email:", email);
  try {
    const response = await api.post("/check-email", email);
    console.log("response:", response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getTaskById = async (taskId) => {
  console.log("taskId:", taskId);
  try {
    const response = await api.get(`/tasks/task/${taskId}`);
    console.log("response:", response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export {
  getCategories,
  addTask,
  addCategory,
  addSubCategory,
  checkEmailExists,
  getTaskById,
};
