import React from "react";
import Layout from "../components/Layout";
import MainMyTasks from "../components/MyTasks/MainMyTasks";

export default function MyTasksPage() {
  return (
    <>
      <Layout NameComponent={MainMyTasks} />;
    </>
  );
}
