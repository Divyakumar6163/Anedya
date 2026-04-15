const Device = require("../models/Device");
const simulator = require("../simulator");
const DeviceHistory = require("../models/DeviceHistory");
exports.getDevices = async (req, res) => {
  try {
    const data = await Device.findOne();
    // console.log("Live data:", data);
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
  const data = await DeviceHistory.findOne();
  // console.log("Historical data:", data);
  res.json(data);
};

exports.toggleRelay = async (req, res) => {
  try {
    let device = await Device.findOne();
    console.log("Current device state before toggle:", device);
    if (!device) {
      device = await Device.create({
        relay: false,
        temperature: 32,
        humidity: 50,
      });
    }
    device.relay = !device.relay;
    // if (relayState) {
    //   simulator.startSimulator();
    // } else {
    //   simulator.stopSimulator();
    // }
    console.log("Toggling relay to:", device.relay);
    await device.save();
    if (device.relay) {
      await simulator.startSimulator();
    } else {
      simulator.stopSimulator();
    }
    // console.log("Updated device state:", device);
    res.json(device);
  } catch (err) {
    console.error("Relay Error:", err);
    res.status(500).json({ message: "Error toggling relay" });
  }
};
