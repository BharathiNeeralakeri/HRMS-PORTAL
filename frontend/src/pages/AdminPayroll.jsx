import React, { useEffect, useState } from "react";

function AdminPayroll() {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = () => {
    fetch("http://localhost:5000/api/employees")
      .then(res => res.json())
      .then(data => setEmployees(data));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const approve = (id) => {
    fetch(`http://localhost:5000/api/payroll/approve/${id}`, {
      method: "PUT",
    }).then(fetchEmployees);
  };

  const reject = (id) => {
    fetch(`http://localhost:5000/api/payroll/reject/${id}`, {
      method: "PUT",
    }).then(fetchEmployees);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>👑 Admin Payroll Approval</h2>

      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Salary</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td>{emp.name}</td>
              <td>₹{emp.salary}</td>
              <td>{emp.paymentStatus}</td>

              <td>
                {emp.paymentStatus === "Pending" && (
                  <>
                    <button onClick={() => approve(emp._id)}>Approve</button>
                    <button onClick={() => reject(emp._id)}>Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPayroll;