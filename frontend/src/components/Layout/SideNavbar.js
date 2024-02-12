import React from "react";
import { NavLink } from "react-router-dom";
import github from "../../assets/github.png";
import externalLink from "../../assets/external-link.png";

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
    <nav className="h-full w-60 hidden lg:flex flex-col justify-between border-r border-mediumGreen bg-whiteOff fixed z-10 pt-24">
      <ul className="flex flex-col">
        {navigation.map((nav, i) => (
          <li className="h-16 mt-10" key={i}>
            <NavLink
              className={({ isActive }) =>
                [
                  "flex w-full h-full justify-center items-center ",
                  isActive ? "text-white bg-mediumGreen" : "",
                ].join(" ")
              }
              to={nav.href}
            >
              {nav.name}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-center cursor-pointer">
        <a
          href="https://github.com/chingu-voyages/v47-tier3-team-27"
          target="_blank"
          className="flex items-center"
        >
          <img className="h-6 mr-2" src={github} alt="GitHub" />
          <span className="text-sm">GitHub Repo</span>
          <img className="h-4 ml-2" src={externalLink} alt="External Link" />
        </a>
      </div>
    </nav>
  );
}
