import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import HRDashboard from "./pages/HRDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import AddEmployee from "./pages/HR/AddEmployee";
import Employees from "./pages/HR/Employees";
import Attendance from "./pages/HR/Attendance";
import Salary from "./pages/Salary";
import Leave from "./pages/Leave";
import Settings from "./pages/Settings";
import HRAttendance from "./pages/HR/Attendance";
import Payroll from "./pages/HR/Payroll";


function App() {
  return (
    
      <Routes>

        {/* DEFAULT PAGE */}
        <Route path = "/" element={<Login />} />

        {/* HR DASHBOARD */}
        <Route path = "/hr-dashboard" element={<HRDashboard />} />

        {/* EMPLOYEE DASHBOARD */}
        <Route path = "/employee-dashboard" element={<EmployeeDashboard />} />

        {/* ADDEMPLOYEE */}
         <Route path="/add-employee" element={<AddEmployee />} />

         <Route path="/employees" element={<Employees />} />

         {/* ATTENDANCE */}
        
         <Route path="/salary" element={<Salary />} />
         <Route path="/leave" element={<Leave />} />
         <Route path="/settings" element={<Settings />} />
         <Route path="/hr-attendance" element={<HRAttendance />} />
         

      </Routes>
    
  );
}

export default App;




