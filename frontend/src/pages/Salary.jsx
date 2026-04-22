import React from "react";
import Sidebar from "../components/Sidebar";

function Salary() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <h1>Salary</h1>
        <p>Salary details will appear here</p>
      </div>
    </div>
  );
}

export default Salary;