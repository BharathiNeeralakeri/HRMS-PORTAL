import React, { useEffect, useState } from "react";
import "./EmployeeDashboard.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function EmployeeDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  console.log("LOGGED IN USER:", user);

  const [meetings, setMeetings] = useState([]);
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  // ✅ LOGOUT FUNCTION
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("user");
      navigate("/");
    }
  };

  // ✅ PROTECT ROUTE
  useEffect(() => {
    if (!user || user.role !== "employee") {
      navigate("/");
    }
  }, [user, navigate]);

  // ✅ Fetch Meetings
  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:5000/api/meetings/${user.email}`)
      .then(res => res.json())
      .then(data => setMeetings(data))
      .catch(err => console.log(err));
  }, [user]);

  // ✅ Dummy Activity
  useEffect(() => {
    setActivities([
      { text: "Logged in", time: "Today, 9:00 AM" },
      { text: "Marked Attendance", time: "Today, 9:05 AM" },
      { text: "Applied for Leave", time: "Yesterday" },
      { text: "Viewed Salary Details", time: "2 days ago" },
    ]);
  }, []);

  return (
    <div className="dashboard-container">
      
      {/* Sidebar */}
      <div className="sidebar">
        <img src={logo} alt="logo" className="logo-img" />
        <h2>HRMS</h2>

        <ul>
          <li className="active">🏠 Dashboard</li>
          <li>📅 Attendance</li>
          <li>📝 Leave</li>
          <li>⚙ Settings</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">

        {/* Header */}
        <div className="top-bar">
          <h1>Employee Dashboard</h1>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <button className="profile-btn">{user?.name}</button>

            {/* ✅ LOGOUT BUTTON */}
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        {/* Welcome Card */}
        <div className="welcome-card">
          <h2>Welcome, {user?.name} 👋</h2>
          <p>Email: {user?.email}</p>
        </div>

        {/* Stats */}
        <div className="stats">
          <div className="card">
            <h3>Attendance</h3>
            <p>22 / 30 Days</p>
          </div>

          <div className="card">
            <h3>Leaves</h3>
            <p>3 Remaining</p>
          </div>

          <div className="card">
            <h3>Salary</h3>
            <p>₹55,000</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="bottom-section">

          {/* Meetings */}
          
          <div className="meetings-card">
            <h3>📅 Meetings Scheduled</h3>

            {meetings.length === 0 ? (
              <p>HR Meeting</p>
            ) : (
              meetings.map((m, index) => (
                <div key={index} className="meeting-item">
                  <p><strong>{m.title}</strong></p>
                  <p>{m.date} | {m.time}</p>
                </div>
              ))
            )}
          </div>

          {/* Activity */}
          <div className="activities">
            <h3>⚡ Recent Activity</h3>

            {activities.map((a, index) => (
              <div key={index} className="activity-item">
                <p>{a.text}</p>
                <span>{a.time}</span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}

export default EmployeeDashboard;