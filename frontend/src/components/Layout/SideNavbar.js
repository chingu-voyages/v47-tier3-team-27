import React from "react";
import { NavLink, Link } from "react-router-dom";
import github from "../../assets/github.png";
import externalLink from "../../assets/external-link.png";
import plant from "../../assets/freepik--Plant--inject-57.png";

export default function SideNavbar() {
  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      ),
    },
    {
      name: "My tasks",
      href: "/mytasks",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
          />
        </svg>
      ),
    },
    {
      name: "New Task",
      href: "/newtask",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      ),
    },
  ];

  return (
    <nav className="h-full w-60 hidden lg:flex flex-col justify-between border-r border-mediumGreen bg-whiteOff fixed z-10 pt-24">
      <figure className="absolute left-14 bottom-10 z-0">
        <img className="h-[210px] opacity-30 md:opacity-100" src={plant} />
      </figure>
      <ul className="flex flex-col">
        {navigation.map((nav, i) => (
          <li className="h-16 mt-10" key={i}>
            <NavLink
              className={({ isActive }) =>
                [
                  "flex w-full h-full justify-start items-center pl-5",
                  isActive ? "text-white bg-mediumGreen" : "",
                ].join(" ")
              }
              to={nav.href}
            >
              <span className="mr-2">{nav.icon}</span>{" "}
              <span className="hover:font-semibold">{nav.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="footer_note flex-column justify-center cursor-pointer relative z-10">
        <Link
          to="https://github.com/chingu-voyages/v47-tier3-team-27"
          target="_blank"
        >
          <div className="flex text-sm justify-center items-center">
            <p className="text-sm flex justify-center mr-2">&copy; 2024</p>
            <img className="h-6" src={github} alt="GitHub" />
            <span className="">GitHub Repo</span>
            <img className="h-4 ml-1" src={externalLink} alt="External Link" />
          </div>
        </Link>
        <hr className="text-greyGreen"/>
        <p className="text-sm text-center">Meet TaskZen creators:</p>
        <p
          className="text-sm linkedin_links flex justify-center gap-2"
          
        >
          <Link to="https://www.linkedin.com/in/celinelecorvaisier/">
            {" "}
            <p>Celine</p>{" "}
          </Link>
          <Link to="https://www.linkedin.com/in/roshrr/">
            {" "}
            <p>Roshan</p>{" "}
          </Link>
          <Link to="www.linkedin.com/in/lena-esposito">
            {" "}
            <p>Lena</p>{" "}
          </Link>
          <Link to="https://www.linkedin.com/in/josue-mbuyu/">
            {" "}
            <p>Josué</p>{" "}
          </Link>
          <Link to="https://www.linkedin.com/in/whitejsx/">
            {" "}
            <p>White</p>{" "}
          </Link>
        </p>
      </div>
    </nav>
  );
}
