import React from "react";
import Layout from "../components/Layout";
import MainDashboard from "../components/MainDashboard";

export default function MyTasksPage() {
  return (
    <>
      <Layout NameComponent={MainDashboard} />;
    </>
  );
}
