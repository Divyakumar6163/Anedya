const socketIO = require("./socket");
const DeviceHistory = require("./models/DeviceHistory");

let temperature = 32;
let humidity = 50;
let relay = false;

let intervalId = null;

function setRelay(state) {
  relay = state;
  console.log("Relay:", relay);
  return relay;
}

async function generateData() {
  if (!relay) return;

  temperature += (Math.random() - 0.49) * 2;
  humidity += (Math.random() - 0.5) * 2;

  const data = {
    time: new Date().toLocaleTimeString(),
    temperature: +temperature.toFixed(2),
    humidity: +humidity.toFixed(2),
  };

  console.log("📊 New Data:", data);

  // 🔥 SAVE DIRECTLY TO DB
  await DeviceHistory.findOneAndUpdate(
    {},
    {
      $push: {
        data: {
          $each: [data],
          $slice: -50, // keep only last 50
        },
      },
    },
    { upsert: true },
  );
}

function startSimulator() {
  if (intervalId) return;

  console.log("🚀 Simulator Started");

  intervalId = setInterval(() => {
    generateData();
  }, 3000);
}

function stopSimulator() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
    console.log("🛑 Simulator Stopped");
  }
}

module.exports = {
  startSimulator,
  stopSimulator,
  setRelay,
};
