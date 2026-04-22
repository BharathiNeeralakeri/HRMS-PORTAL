import React, { useEffect, useState } from "react";
import "./Payroll.css";

function Payroll() {
  const [employees, setEmployees] = useState([]);

  // ✅ Fetch employees
  const fetchEmployees = () => {
    fetch("http://localhost:5000/api/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // ✅ 👉 ADD YOUR FUNCTION HERE
  const handlePay = async (id) => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/payroll/pay/${id}`,
      {
        method: "PUT",
      }
    );

    const data = await res.json();
    console.log("UPDATED EMP:", data);

    fetchEmployees(); // refresh
  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="payroll-container">
      <h2>💰 Payroll Management</h2>

      <table className="payroll-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Salary</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td>{emp.name}</td>
              <td>₹{emp.salary}</td>

              <td>
                {emp.paymentStatus === "Paid" ? (
                  <span className="paid">Paid ✅</span>
                ) : (
                  <button
                    className="pay-btn"
                    onClick={() => handlePay(emp._id)}
                  >
                    Pay
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Payroll;