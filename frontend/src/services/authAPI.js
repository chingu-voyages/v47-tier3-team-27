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

    const token = data.token;
    sessionStorage.setItem("token", token);
    return data;
  } else {
    // Registration failed, handle errors
    const errorData = await response.json();
    console.log("error data", errorData);
  }
}

async function signOut() {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${API_URL}/signout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200) {
    sessionStorage.removeItem("token");
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
