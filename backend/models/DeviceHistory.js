const mongoose = require("mongoose");

const deviceHistorySchema = new mongoose.Schema({
  data: [
    {
      time: String,
      temperature: Number,
      humidity: Number,
    },
  ],
});

module.exports = mongoose.model("DeviceHistory", deviceHistorySchema);
