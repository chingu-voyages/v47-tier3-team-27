const API_URL = process.env.REACT_APP_API_URL;

async function getTasks(userId) {
  const response = await fetch(`${API_URL}/tasks/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("get tasks. dataAPI", response);
  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    const errorData = await response.json();
    console.log("error data", errorData);
  }
}

async function getCategories() {
  const response = await fetch(`${API_URL}/categories/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("get categories. dataAPI", response);
  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    const errorData = await response.json();
    console.log("error data", errorData);
  }
}

async function getSubCategories() {
  const response = await fetch(`${API_URL}/subcategories/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    const errorData = await response.json();
    console.log("error data", errorData);
  }
}

const exportFunctions = {
  getTasks,
  getCategories,
  getSubCategories,
};

export default exportFunctions;
