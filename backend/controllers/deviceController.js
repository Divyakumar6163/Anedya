const anedya = require("../services/anedyaServices");
const socketIO = require("../socket");
const Device = require("../models/Device");
exports.getDevices = async (req, res) => {
  try {
    const data = await anedya.getLiveData();
    console.log("Live data:", data);
    res.json({
      name: "Room 1",
      status: data.online ? "online" : "offline",
      temperature: data.temperature,
      humidity: data.humidity,
      relay: data.relay,
    });
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch device data" });
  }
};

exports.getHistory = async (req, res) => {
  const data = await anedya.getHistory();
  console.log("Historical data:", data);
  res.json(data);
};

const socket = require("../socket");

exports.toggleRelay = async (req, res) => {
  try {
    let device = await Device.findOne();
    if (!device) {
      device = await Device.create({
        relay: false,
        temperature: 32,
        humidity: 50,
      });
    }

    device.relay = !device.relay;
    await device.save();

    socketIO.getIO().emit("relayUpdated", {
      relay: device.relay,
      status: device.relay ? "online" : "offline",
    });

    res.json(device);
  } catch (err) {
    console.error("Relay Error:", err);
    res.status(500).json({ message: "Error toggling relay" });
  }
};
