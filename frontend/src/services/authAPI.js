const API_URL = process.env.REACT_APP_API_URL;

async function signUp(username, email, password) {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status === 201) {
    const data = await response.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.username);
    localStorage.setItem("userId", data.userId);

    return true;
  } else {
    const errorData = await response.json();
    console.log("error data", errorData);
  }
}

async function signIn(username, email, password) {
  const response = await fetch(`${API_URL}/auth/signin`, {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status === 200) {
    const data = await response.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.username);
    localStorage.setItem("userTasks", data.tasks);
    localStorage.setItem("userId", data.userId);

    return true;
  } else {
    // Registration failed, handle errors
    const errorData = await response.json();
    console.log("error data", errorData);
  }
}

async function signOut() {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/signout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200) {
    localStorage.clear();
    // localStorage.removeItem("token");
    // localStorage.removeItem("userUsername");
    // localStorage.removeItem("userTasks");
    // localStorage.removeItem("userId");

    return true;
  } else {
    const errorData = await response.json();
    console.log(errorData);
  }
}

const exportFunctions = {
  signUp,
  signIn,
  signOut,
};

export default exportFunctions;
