import React from "react";
import circles from "../assets/3circles.svg";
import checklist from "../assets/checklist.svg";
import Logo from "../components/Logo";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import fb from "../assets/fb.png";
import twitter from "../assets/twitter.png";
import gmail from "../assets/gmail.png";

export default function RegisterPage() {
  return (
    <div className="min-h-screen">
      <section className="w-full h-screen flex">
        {/* Left column */}
        <aside className="w-[25%] py-4 px-8 space-y-10 bg-lightGreen">
          <div className="flex justify-center gap-6">
            <img src={circles} alt="" srcset="" />
            <h2 className="leading-[1]">
              Task <br /> Zen
            </h2>
          </div>
          <p className="leading-relaxed">
            Supercharge your day! Easy tasks, smart scheduling. Effortless
            organization for unstoppable productivity. Your go-to app for
            streamlined success
          </p>

          <div className="flex justify-center pt-20">
            <img src={checklist} className="w-[70%]" alt="" srcset="" />
          </div>
        </aside>

        {/* Right column */}
        <main className="w-[75%] flex flex-col justify-around">
          <Logo />

          <form action="" className="w-[30%] mx-auto">
            <label className="" htmlFor="">
              Username / Email:
            </label>
            <input
              className="w-full"
              type="text"
              placeholder="enter username/email"
            />

            <label htmlFor="">Password:</label>
            <input type="password" placeholder="enter password" />

            <Button className="mt-10">Register</Button>

            <Link to="/register">
              <Button className="mt-10" type="white">
                Register
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
