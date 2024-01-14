import React from "react";
import "../styles/HomePage.css";
import logo from "../assets/LOGO.png";
import circles from "../assets/3circles.svg";
import plant from "../assets/plant.png";
import fb from "../assets/fb.png";
import img from "../assets/checklist-img.png";
import twitter from "../assets/twitter.png";
import gmail from "../assets/gmail.png";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="HomePage">
      <section>
        {/* Left column */}
        <aside>
          <div className="plant">
            <img src={plant} alt="Task Zen design element" />
          </div>

          <div className="HomePage__aside--wrapper">
            <div className="center">
              <Link to="/">
                <img src={logo} alt="Task Zen logo" />
              </Link>
              <p>Your daily task manager</p>
            </div>
            <form action="">
              <label htmlFor="">Username / Email:</label>
              <input type="text" placeholder="enter username/email" />

              <label htmlFor="">Password:</label>
              <input type="password" placeholder="enter password" />

              <button style={{ marginTop: "3rem" }} className="btn-accent">
                Login
              </button>
              <button className="btn-white">Register</button>
            </form>
            <div>
              <p className="or center">-------- or --------</p>
              <div className="login-icons">
                <Link>
                  <img src={fb} alt="log in with facebook" />
                </Link>
                <Link>
                  <img src={twitter} alt="log in with X" />
                </Link>
                <Link>
                  <img src={gmail} alt="log in with GMail" />
                </Link>
              </div>
            </div>
          </div>
        </aside>

        {/* Right column */}
        <main>
          <img src={circles} alt="Task Zen design element" />
          <h1>Task Zen</h1>
          <p>
            Effortless Productivity in Your Pocket! Organize, prioritize, and
            conquer tasks with ease. Your shortcut to stress-free success!"
          </p>

          <div className="checklist-img"><img src={img} alt="Task Zen design element" /></div>
        </main>
      </section>
    </div>
  );
}
