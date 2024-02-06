import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/LOGO.png";
import arrowDown from "../../assets/arrow-down.png";
import { UserContext } from "../../contexts/UserContext";
import authAPI from "../../services/authAPI";

export default function Header() {
  const { user } = useContext(UserContext);

  const [show, setIsShow] = useState(false);

  const handleClick = () => {
    setIsShow(!show);
  };

  const handleSignOut = async () => {
    setIsShow(false);
    try {
      const response = await authAPI.signOut();
      if (response) {
        console.log("user logged out");
        //will need to redirect to login page
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-24 flex flex-row justify-between shadow-md bg-whiteOff z-20 fixed">
      <div className="h-full w-24 flex justify-center items-center">
        <Link to="/">
          <img className="w-12	h-12" src={logo} alt="Task Zen logo" />
        </Link>
      </div>
      <div className="relative h-full w-24 flex flex-col items-center	">
        <button
          className="h-full w-24 flex flex-row items-center	justify-evenly border-0"
          onClick={handleClick}
        >
          <p>{user}</p>
          <img className="w-2.5	h-2.5" src={arrowDown} alt="arrow down" />
        </button>
        {show && (
          <button
            className="w-fit h-fit absolute bottom-0 left-0"
            onClick={handleSignOut}
          >
            <p>Log out</p>
          </button>
        )}
      </div>
    </div>
  );
}
