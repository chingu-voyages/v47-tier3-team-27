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
    const token = data.token;
    sessionStorage.setItem("token", token);
    return true;
  } else {
    // Registration failed, handle errors
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
  if (response.status === 201) {
    const data = await response.json();
    const token = data.token;
    sessionStorage.setItem("token", token);
    return true;
  } else {
    // Registration failed, handle errors
    const errorData = await response.json();
    console.log("error data", errorData);
  }
}

const exportFunctions = {
  signUp,
  signIn,
};

export default exportFunctions;
