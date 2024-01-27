import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/LOGO.png";
import arrowDown from "../../assets/arrow-down.png";
import { UserContext } from "../../contexts/UserContext";

export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <div className="w-full h-24 flex flex-row justify-between shadow-md bg-whiteOff z-10	">
      <span className="h-full w-24 flex justify-center items-center">
        <Link to="/">
          {" "}
          <img className="w-12	h-12" src={logo} alt="Task Zen logo" />
        </Link>
      </span>
      <span className="h-full w-24 flex flex-row items-center	justify-evenly">
        <p>{user}</p>
        <img className="w-2.5	h-2.5" src={arrowDown} alt="arrow down" />
      </span>
    </div>
  );
}
