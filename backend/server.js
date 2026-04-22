const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/hrms")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

/* ================= USER (HR LOGIN) ================= */
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String
});

const User = mongoose.model("User", userSchema, "users");

// HR LOGIN
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.trim() });

    if (!user) {
      return res.status(401).json({ message: "Email not found" });
    }

    if (user.password !== password.trim()) {
      return res.status(401).json({ message: "Wrong password" });
    }

    res.json({ user });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= EMPLOYEE ROUTES ================= */

// ✅ IMPORTANT FIX (YOU MISSED THIS)
const employeeAuthRoutes = require("./routes/employeeAuth");
app.use("/api/employee", employeeAuthRoutes);

const meetingRoutes = require("./routes/meetingRoutes");
app.use("/api/meetings", meetingRoutes);

const attendanceRoutes = require("./routes/attendanceRoutes");
app.use("/api/attendance", attendanceRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);``

// Optional (your existing routes)
const employeeRoutes = require("./routes/employeeRoutes");
app.use("/api/employees", employeeRoutes);

const payrollRoutes = require("./routes/payrollRoutes");
app.use("/api/payroll", payrollRoutes);
/* ================= ADD EMPLOYEE ================= */
app.post("/api/employees", async (req, res) => {
  try {
    const Employee = require("./models/Employee");

    const emp = new Employee(req.body);

    await emp.save();
    res.status(201).json(emp);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= TEST ================= */
app.get("/", (req, res) => {
  res.send("API Running...");
});

/* ================= START ================= */
app.listen(5000, () => {
  console.log("🚀 Server running on 5000");
});