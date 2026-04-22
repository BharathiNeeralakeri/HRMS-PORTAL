import React, { useEffect, useState } from "react";
import "./Employees.css";

function Employees() {
  const [employees, setEmployees] = useState([]);

  /* FETCH DATA */
  const fetchEmployees = async () => {
    const res = await fetch("http://localhost:5000/api/employees");
    const data = await res.json();
    setEmployees(data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  /* DELETE */
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/employees/${id}`, {
      method: "DELETE",
    });
    fetchEmployees();
  };

  return (
    <div className="employees-container">
      <h2>Employees List</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Position</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
              <td>{emp.position}</td>
              <td>{emp.salary}</td>

              <td>
                <button onClick={() => handleDelete(emp._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Employees;