import React, { useEffect, useState } from "react";
import "./Attendance.css";

function Attendance() {
  const [employees, setEmployees] = useState([]);

  // ✅ Fetch employees + attendance
  const fetchAttendance = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/attendance/all");
      const data = await res.json();

      console.log("Employees:", data); // 🔍 DEBUG

      setEmployees(data);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  // ✅ Mark attendance
  const markAttendance = async (emp, status) => {
    try {
      await fetch("http://localhost:5000/api/attendance/mark", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employeeId: emp._id,
          name: emp.name,
          email: emp.email,
          status,
        }),
      });

      fetchAttendance(); // refresh
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="attendance-container">
      <h2>📅 Employee Attendance</h2>

      <table className="attendance-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        {/* ✅ FIXED SAFE RENDER */}
        <tbody>
          {employees && employees.length > 0 ? (
            employees.map((emp) => (
              <tr key={emp._id}>
                <td>{emp._id}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>

                <td>
                  <span
                    className={`status ${
                      emp.status === "Present"
                        ? "present"
                        : emp.status === "Absent"
                        ? "absent"
                        : "not-marked"
                    }`}
                  >
                    {emp.status || "Not Marked"}
                  </span>
                </td>

                <td>
                  <button
                    className="btn present-btn"
                    onClick={() => markAttendance(emp, "Present")}
                  >
                    Present
                  </button>

                  <button
                    className="btn absent-btn"
                    onClick={() => markAttendance(emp, "Absent")}
                  >
                    Absent
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No employees found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Attendance;