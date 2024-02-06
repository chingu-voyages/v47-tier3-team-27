const API_URL = process.env.REACT_APP_API_URL;

async function signUp(username, email, password) {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("sign up response", response);
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
  console.log("got here");
  const response = await fetch(`${API_URL}/auth/signin`, {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("response sign in", response);
  if (response.status === 200) {
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
    console.log("done here");
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
