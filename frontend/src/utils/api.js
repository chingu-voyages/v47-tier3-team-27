import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

const getCategories = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await api.get("/categories/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const addTask = async (taskData) => {
  console.log("taskData:", taskData);
  const token = localStorage.getItem("token");

  try {
    const response = await api.post("/tasks", taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("response:", response);

    return response.data;
  } catch (error) {
    throw error;
  }
};

const addCategory = async (categoryData) => {
  const token = localStorage.getItem("token");

  console.log("categoryData:", categoryData);
  try {
    const response = await api.post("/categories/add", categoryData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("response:", response);

    return response.data;
  } catch (error) {
    throw error;
  }
};

const addSubCategory = async (subCategoryData) => {
  const token = localStorage.getItem("token");

  console.log("subCategoryData:", subCategoryData);
  try {
    const response = await api.post("/subcategories/add", subCategoryData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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

export {
  getCategories,
  addTask,
  addCategory,
  addSubCategory,
  checkEmailExists,
};
