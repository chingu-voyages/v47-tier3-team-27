import React from "react";
import { Link } from "react-router-dom";
import logo from '../assets/LOGO.png'

export default function Hero() {
  return (
    <div className="Hero center">
      <img src={logo}/>
      <h1>Task Zen</h1>
      <Link to='/login'><h2>See Login Page</h2></Link>
    </div>
  );
}
