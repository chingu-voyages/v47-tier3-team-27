import React from "react";
import { NavLink } from "react-router-dom";

export default function SideNavbar() {
  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
    },
    {
      name: "My tasks",
      href: "/mytasks",
    },
    {
      name: "New Task",
      href: "/newtask",
    },
    {
      name: "Invite",
      href: "/invite",
    },
  ];

  return (
    <nav className="h-full w-60 flex border-r border-mediumGreen bg-whiteOff">
      <ul className="h-full w-full">
        {navigation.map((nav, i) => {
          return (
            <li className="w-full h-16 flex mt-10" key={i}>
              <NavLink
                className={({ isActive }) =>
                  [
                    "flex w-full h-full	justify-center  items-center ",
                    isActive ? "text-white bg-mediumGreen" : "",
                  ].join(" ")
                }
                to={nav.href}
              >
                {nav.name}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
