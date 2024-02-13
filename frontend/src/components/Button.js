import React from "react";

export default function Button({
  children,
  className,
  color = "primary",
  ...props
}) {
  return (
    <button
      {...props}
      className={`${
        color === "primary" ? "btn-accent" : "btn-white"
      } block w-full ${className}`}
    >
      {children}
    </button>
  );
}
