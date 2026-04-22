import React from "react";
import Sidebar from "../components/Sidebar";

function Leave() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <h1>Leave</h1>
        <p>Apply and track leave</p>
      </div>
    </div>
  );
}

export default Leave;