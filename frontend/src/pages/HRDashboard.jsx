import React, { useState } from "react";
import "./HRDashboard.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import Attendance from "./HR/Attendance";
import AddEmployee from "./HR/AddEmployee";
import Employees from "./HR/Employees";
import Payroll from "./HR/Payroll";

import {
  FaSignOutAlt
} from "react-icons/fa";

function HRDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  const hr = JSON.parse(localStorage.getItem("hr"));

  return (
    <div className="dashboard-container">

      {/* ✅ Sidebar */}
      <div className="sidebar">
        <div className="logo-container">
          <img src={logo} alt="Company Logo" />
        </div>

        <ul>
          <li onClick={() => setActiveTab("dashboard")}>🏠 Dashboard</li>
          <li onClick={() => setActiveTab("addEmployee")}>➕ Add Employee</li>
          <li onClick={() => setActiveTab("employees")}>👥 Employees</li>
          <li onClick={() => setActiveTab("attendance")}>📅 Attendance</li>
          <li onClick={() => setActiveTab("payroll")}>💰 Payroll</li>
          <li onClick={() => navigate("/settings")}>⚙ Settings</li>
        </ul>
      </div>

      {/* ✅ Main Content */}
      <div className="main-content">

        {/* Topbar */}
        <div className="topbar">
          <h2>HR Dashboard</h2>

          <div className="top-right">
            <span className="email-text">{hr?.email}</span>

            <button
              className="logout-btn"
              onClick={() => {
                localStorage.removeItem("hr");
                navigate("/");
              }}
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>

        {/* ✅ Dynamic Content */}
        <div className="content">

          {activeTab === "dashboard" && (
            <div className="cards">
              <div className="card">
                <h3>Total Employees</h3>
                <p>20</p>
              </div>

              <div className="card">
                <h3>Present Today</h3>
                <p>14</p>
              </div>

              <div className="card">
                <h3>On Leave</h3>
                <p>5</p>
              </div>

              <div className="card">
                <h3>Payroll Cost</h3>
                <p>₹12,00,000</p>
              </div>
            </div>
          )}

          {activeTab === "attendance" && <Attendance />}

          {activeTab === "employees" && <Employees />}

          {activeTab === "addEmployee" && <AddEmployee />}

          {activeTab === "payroll" && <Payroll />}

          

        </div>
      </div>
    </div>
  );
}

export default HRDashboard;