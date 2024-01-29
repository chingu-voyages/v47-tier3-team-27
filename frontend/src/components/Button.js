import React from "react";

export default function Button({ children, className, type = "primary" }) {
  return (
    <button
      className={`${
        type === "primary" ? "btn-accent" : "btn-white"
      } block w-full ${className}`}
    >
      {children}
    </button>
  );
}
