import React, { useEffect, useState } from "react";

function Attendance() {
  const employee = JSON.parse(localStorage.getItem("employee"));
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/attendance/employee/${employee.email}`)
      .then(res => res.json())
      .then(data => setAttendance(data));
  }, []);

  return (
    <div>
      <h2>My Attendance</h2>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {attendance.length === 0 ? (
            <tr>
              <td colSpan="2">No attendance records</td>
            </tr>
          ) : (
            attendance.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Attendance;