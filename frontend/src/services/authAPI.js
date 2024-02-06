const API_URL = process.env.REACT_APP_API_URL;
// API_URL encouters a bug, it redirects to localhost3000 instead of 5000

async function signUp(username, email, password) {
  console.log("username, email, password", username, email, password);
  const response = await fetch("http://localhost:5000/api/auth/signup", {
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
    const errorData = await response.json(); // Parse the error JSON
    console.log("error data", errorData);
  }
}

const exportFunctions = {
  signUp,
};

export default exportFunctions;
