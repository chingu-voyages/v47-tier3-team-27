import React from "react";
import "../styles/HomePage.css";
import circles from "../assets/3circles.svg";
import plant from "../assets/plant.png";
import fb from "../assets/fb.png";
import img from "../assets/checklist-img.png";
import twitter from "../assets/twitter.png";
import gmail from "../assets/gmail.png";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import authAPI from "../services/authAPI";
import SignForm from "../components/SignForm";

export default function HomePage() {
  const handleSignIn = async (infoUser) => {
    try {
      console.log("trying");
      const response = await authAPI.signIn(
        infoUser.username,
        infoUser.email,
        infoUser.password
      );
      if (response) {
        // will need to add redirection to dashboard
        console.log("user logged in");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="HomePage">
      <section>
        {/* Left column */}
        <aside className="w-full lg:w-[25%]">
          <div className="plant hidden lg:block">
            <img src={plant} alt="Task Zen design element" />
          </div>

          <div className="HomePage__aside--wrapper w-full">
            <Logo />

            <SignForm
              handleSubmit={handleSignIn}
              buttonOneName={"Login"}
              buttonTwoName={"Register"}
              navigationButtonTwo={`/register`}
            />

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
        <main className="lg:block hidden">
          <img src={circles} alt="Task Zen design element" />
          <h1>Task Zen</h1>
          <p>
            Effortless Productivity in Your Pocket! Organize, prioritize, and
            conquer tasks with ease. Your shortcut to stress-free success!
          </p>

          <div className="checklist-img">
            <img src={img} alt="Task Zen design element" />
          </div>
        </main>
      </section>
    </div>
  );
}
