import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/LOGO.png";
import logOutIcon from "../../assets/right-from-bracket.svg";
import arrowDown from "../../assets/arrow-down.png";
import { UserContext } from "../../contexts/UserContext";
import authAPI from "../../services/authAPI";

export default function Header() {
  const navigate = useNavigate();
  const { username } = useContext(UserContext);
  const [show, setIsShow] = useState(false);

  const handleClick = () => {
    setIsShow(!show);
  };

  const handleSignOut = async () => {
    setIsShow(false);
    try {
      const response = await authAPI.signOut();
      if (response) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-24 flex flex-row justify-between shadow-md bg-whiteOff z-20 fixed">
      <div className="h-full w-24 flex justify-center items-center">
        <Link to="/dashboard">
          <img className="w-12	h-12" src={logo} alt="Task Zen logo" />
        </Link>
      </div>
      <div className="relative h-full w-fit flex flex-col items-center	mr-4">
        <button
          className="h-full w-fit flex flex-row items-center	justify-evenly border-0"
          onClick={handleClick}
        >
          <p>{username}</p>
          <img
            className="w-2.5	h-2.5 ml-2.5 "
            src={arrowDown}
            alt="arrow down"
          />
        </button>
        {show && (
          <button
            className="min-w-[7.5rem] flex  gap-2 items-center justify-center h-fit absolute bg-white bottom-[-0.5rem] right-1 shadow-md hover:font-semibold"
            onClick={handleSignOut}
          >
            <img className="h-[1.1rem]" src={logOutIcon} />
            <p>Log out</p>
          </button>
        )}
      </div>
    </div>
  );
}
