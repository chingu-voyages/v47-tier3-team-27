import React from "react";

export default function DisplayMonth() {
  const today = new Date();
  console.log("today", today);
  return (
    <>
      <h1>|{today}</h1>
    </>
  );
}
