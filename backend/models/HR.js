const mongoose = require("mongoose");

const hrSchema = new mongoose.Schema ({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "HR"}
});

module.exports = mongoose.model("HR", hrSchema);