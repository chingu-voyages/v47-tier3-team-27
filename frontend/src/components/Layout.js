import React from "react";
import Header from "./Header";
import SideNavBar from "./SideNavbar";
import SideNavbarMobile from "./SideNavbarMobile";

export default function Layout(props) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <section className="h-full w-full flex flex-row">
        <SideNavBar />
        <div className="p-8 w-full lg:pl-64 py-28">
          <props.NameComponent />
        </div>
        <SideNavbarMobile />
      </section>
    </div>
  );
}
