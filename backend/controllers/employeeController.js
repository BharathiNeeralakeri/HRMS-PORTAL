const Employee = require("../models/Employee");

exports.addEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body);

    await employee.save();

    res.status(201).json({
      message: "Employee added successfully",
      employee
    });

  } catch (error) {
    res.status(500).json({
      message: "Error adding employee",
      error
    });
  }
};