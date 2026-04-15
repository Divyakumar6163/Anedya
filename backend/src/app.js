const express = require("express");
const cors = require("cors");
const connectDB = require("../config/db");
const simulator = require("../simulator");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB
connectDB();
simulator.startSimulator();
console.log("Simulator initialized");
// Routes
app.use("/api/auth", require("../routes/authRoute"));
app.use("/api/users", require("../routes/userRoute"));
app.use("/api/devices", require("../routes/deviceRoute"));

module.exports = app;
