import React from "react";
import Layout from "../components/Layout";
import NewTask from "../components/NewTask";

export default function NewTaskPage() {
  return (
    <>
      <Layout NameComponent={NewTask} />;
    </>
  );
}
