import React, { useState } from "react";
import "./Settings.css";

function Settings() {
  const [form, setForm] = useState({
    companyName: "ADISYS",
    email: "hr@gmail.com",
    phone: "+91 9876543210",
    password: "",
    theme: "light",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    alert("Settings Saved Successfully ✅");
    console.log(form);
  };

  return (
    <div className="settings-container">
      <h2 className="settings-title">⚙ HR Settings</h2>

      <div className="settings-grid">

        {/* Profile Settings */}
        <div className="settings-card">
          <h3>👤 Profile Settings</h3>
          <input
            type="text"
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
            placeholder="Company Name"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
          />
        </div>

        {/* Security */}
        <div className="settings-card">
          <h3>🔒 Security</h3>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="New Password"
          />
          <button className="danger-btn">Reset Password</button>
        </div>

        {/* Preferences */}
        <div className="settings-card">
          <h3>🎨 Preferences</h3>
          <select name="theme" value={form.theme} onChange={handleChange}>
            <option value="light">Light Mode</option>
            <option value="dark">Dark Mode</option>
          </select>
        </div>

        {/* Notifications */}
        <div className="settings-card">
          <h3>🔔 Notifications</h3>
          <label>
            <input type="checkbox" defaultChecked /> Email Alerts
          </label>
          <label>
            <input type="checkbox" /> SMS Alerts
          </label>
        </div>

      </div>

      <button className="save-btn" onClick={handleSave}>
        Save Changes
      </button>
    </div>
  );
}

export default Settings;