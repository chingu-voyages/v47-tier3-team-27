import React, { useState } from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

export default function SignForm(props) {
  const { handleSubmit, buttonOneName, buttonTwoName, navigationButtonTwo } =
    props;

  const [infoUser, setInfoUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  // gather all credentials user
  const onInputChange = (event) => {
    const { name, value } = event.target;
    setInfoUser((prevInfoUser) => ({
      ...prevInfoUser,
      [name]: value,
    }));
  };

  const sendDataToParent = (event) => {
    event.preventDefault();

    handleSubmit(infoUser);
  };

  return (
    <form onSubmit={sendDataToParent}>
      <label className="" htmlFor="username">
        Username:
      </label>
      <input
        className="w-full"
        type="text"
        name="username"
        id="username"
        placeholder="enter username"
        onChange={onInputChange}
        required
      />
      <label className="" htmlFor="email">
        Email:
      </label>
      <input
        className="w-full"
        type="text"
        name="email"
        id="email"
        placeholder="enter email"
        onChange={onInputChange}
        required
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="enter password"
        onChange={onInputChange}
        required
      />

      <Button className="mt-4" type="submit">
        {buttonOneName}
      </Button>

      <p className="text-sm text-center mt-8">or click here to {buttonTwoName.toLowerCase()}:</p>
      <Link to={navigationButtonTwo}>
        <Button className="mt-2" type="white">
          {buttonTwoName}
        </Button>
      </Link>
    </form>
  );
}
