import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import img404 from "../assets/404.png";

export default function FourOhFour() {
  return (
    <div className="FourOhFour flex flex-col justify-between">
      <Header />
      <div className="h-20"></div>
      <div className="h-[500px] w-full grid place-items-center">
        <img
          className="w-[70%] max-w-[450px]"
          src={img404}
          alt="Illustration of 404 Error"
        />
      </div>
      <Footer />
    </div>
  );
}
