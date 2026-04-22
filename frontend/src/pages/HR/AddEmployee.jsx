import React, { useState } from "react";
import "./AddEmployee.css";

function AddEmployee() {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    position: "",
    salary: ""
  });

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(employee)
      });

      /* 🔥 HANDLE ERROR PROPERLY */
      const text = await res.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("❌ Backend not hit. Check server or URL");
      }

      if (!res.ok) {
        throw new Error(data.error || "Error adding employee");
      }

      alert("✅ Employee Added Successfully");

      setEmployee({
        name: "",
        email: "",
        password: "",
        department: "",
        position: "",
        salary: ""
      });

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="add-employee-container">
      <form className="add-employee-form" onSubmit={handleSubmit}>
        <h2>Add Employee</h2>

        <input name="name" placeholder="Name" value={employee.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={employee.email} onChange={handleChange} required />
        <input name="password" placeholder="Password" value={employee.password} onChange={handleChange} required />
        <input name="department" placeholder="Department" value={employee.department} onChange={handleChange} />
        <input name="position" placeholder="Position" value={employee.position} onChange={handleChange} />
        <input name="salary" placeholder="Salary" value={employee.salary} onChange={handleChange} />

        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
}

export default AddEmployee;