const express = require("express");
const cors = require("cors");
const connectDB = require("../config/db");
const simulator = require("../simulator");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://anedya.vercel.app",
      "https://anedya.vercel.app/login",
      "http://localhost:10000",
      "https://anedya.onrender.com/api",
    ],
    credentials: true,
  }),
);
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
