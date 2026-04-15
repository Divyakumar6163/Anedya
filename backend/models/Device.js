const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
  name: String,
  status: { type: String, enum: ["online", "offline"], default: "offline" },
  temperature: Number,
  humidity: Number,
  relay: { type: Boolean, default: false },
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Device", deviceSchema);
