import React from "react";
import logo from "../../assets/LOGO.png";
import arrowDown from "../../assets/arrow-down.png";

export default function Header() {
  return (
    <div className="w-full h-24 flex flex-row justify-between shadow-md bg-whiteOff z-10	">
      <span className="h-full w-24 flex justify-center items-center">
        <img className="w-12	h-12" src={logo} alt="Task Zen logo" />
      </span>
      <span className="h-full w-24 flex flex-row items-center	justify-evenly">
        <p>Joe Doe</p>
        <img className="w-2.5	h-2.5" src={arrowDown} alt="arrow down" />
      </span>
    </div>
  );
}
