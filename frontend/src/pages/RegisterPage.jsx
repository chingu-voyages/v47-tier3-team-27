import React, { useState } from "react";
import circles from "../assets/3circles.svg";
import checklist from "../assets/checklist.svg";
import Logo from "../components/Logo";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import fb from "../assets/fb.png";
import twitter from "../assets/twitter.png";
import gmail from "../assets/gmail.png";

import authAPI from "../services/authAPI";

export default function RegisterPage() {
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

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      const response = await authAPI.signUp(
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
    <div className="min-h-screen">
      <section className="w-full h-screen flex">
        {/* Left column */}
        <aside className="lg:block hidden w-[25%] py-4 px-8 space-y-24 bg-lightGreen">
          <div className="flex justify-center gap-6">
            <img src={circles} alt="" srcSet="" />
            <h2 className="leading-[1]">
              Task <br /> Zen
            </h2>
          </div>
          <p className="leading-relaxed">
            Supercharge your day! Easy tasks, smart scheduling. Effortless
            organization for unstoppable productivity. Your go-to app for
            streamlined success
          </p>

          <div className="flex justify-center">
            <img src={checklist} className="w-[70%]" alt="" srcSet="" />
          </div>
        </aside>

        {/* Right column */}
        <main className="w-full lg:w-[75%]  flex flex-col justify-around">
          <Logo />

          <form
            onSubmit={handleSignUp}
            className="w-full px-6 lg:w-[30%] mx-auto"
          >
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

            <Button className="mt-10" type="submit">
              Register
            </Button>

            <Link to="/">
              <Button className="mt-10" type="white">
                Login
              </Button>
            </Link>
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
        </main>
      </section>
    </div>
  );
}
