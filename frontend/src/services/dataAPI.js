const API_URL = process.env.REACT_APP_API_URL;

async function getDailyTasks(userId) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/tasks/daily/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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

async function getTasks(userId) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/tasks/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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

async function getCategories() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/categories/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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

async function getSubCategories() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/subcategories/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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

async function displayLogByTask(taskId) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/logs/${taskId}/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Could not load history.");
  }
  const data = await response.json();
  return data;
}

async function addLog(user, taskId, logDescription) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/logs/${taskId}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ user, logDescription }),
  });
  if (!response.ok) {
    throw new Error("Could not load history.");
  }
  const data = await response.json();
  return data;
}

async function EditTaskReq(taskId, form) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: form.name,
      taskDescription: form.description,
    }),
  });
  if (!response.ok) {
    throw new Error("Could not load history.");
  }
  const data = await response.json();
  return data;
}

const exportFunctions = {
  getTasks,
  getDailyTasks,
  getCategories,
  getSubCategories,
  displayLogByTask,
  addLog,
  EditTaskReq,
};

export default exportFunctions;
