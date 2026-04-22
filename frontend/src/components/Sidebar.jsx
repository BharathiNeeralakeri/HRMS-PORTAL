import React from "react";
import { useNavigate } from "react-router-dom";
import "../pages/EmployeeDashboard.css";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <h2>HRMS</h2>

      <ul>
        <li onClick={() => navigate("/employee-dashboard")}>🏠 Dashboard</li>
        <li onClick={() => navigate("/attendance")}>📅 Attendance</li>
        <li onClick={() => navigate("/salary")}>💰 Salary</li>
        <li onClick={() => navigate("/leave")}>📝 Leave</li>
        <li onClick={() => navigate("/settings")}>⚙ Settings</li>
      </ul>
    </div>
  );
}

export default Sidebar;