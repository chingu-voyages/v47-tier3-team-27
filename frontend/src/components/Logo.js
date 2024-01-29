import { Link } from "react-router-dom";
import logo from "../assets/LOGO.png";

export default function Logo() {
  return (
    <div className="text-center space-y-2">
      <Link to="/">
        <img className="mx-auto" src={logo} alt="Task Zen logo" />
      </Link>
      <p>Your daily task manager</p>
    </div>
  );
}
