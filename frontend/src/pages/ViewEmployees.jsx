import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewEmployees.css";

function ViewEmployees() {

  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const res = await axios.get("http://localhost:5000/api/employees");
    setEmployees(res.data.employees || res.data);
  };

  const deleteEmployee = async (id) => {
    if(window.confirm("Delete Employee?")){
      await axios.delete(`http://localhost:5000/api/employees/${id}`);
      fetchEmployees();
    }
  };

  const filteredEmployees = employees.filter(emp =>
    (emp.name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="viewWrapper">

      <div className="viewCard">

        <h2 className="title">Employees List</h2>

        <input
          className="searchInput"
          placeholder="🔍 Search employee..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />

        <table className="table">

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
            {filteredEmployees.map(emp => (
              <tr key={emp._id}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>{emp.position}</td>
                <td>₹ {emp.salary}</td>
                <td>
                  <button className="edit">Edit</button>
                  <button
                    className="delete"
                    onClick={()=>deleteEmployee(emp._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ViewEmployees;