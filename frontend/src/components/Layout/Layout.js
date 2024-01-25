import React from "react";
import Header from "./Header";
import SideNavBar from "./SideNavbar";

export default function Layout(props) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <section className="h-screen w-full flex flex-row">
        <SideNavBar />
        <props.NameComponent />
        {/* <component name={props.NameComponent} /> */}
      </section>
    </div>
  );
}
