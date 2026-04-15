const Device = require("./models/Device");
const DeviceHistory = require("./models/DeviceHistory");
let temperature = 32;
let humidity = 50;
let intervalId = null;

async function generateData(relay) {
  console.log("Generated Relay:", relay);
  if (!relay) return;
  temperature += (Math.random() - 0.49) * 2;
  humidity += (Math.random() - 0.5) * 2;

  const data = {
    time: new Date().toLocaleTimeString(),
    temperature: +temperature.toFixed(2),
    humidity: +humidity.toFixed(2),
  };

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

async function startSimulator() {
  if (intervalId) return;
  console.log("Simulator Started");
  const data = await Device.findOne();
  intervalId = setInterval(() => {
    generateData(data.relay);
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
  generateData,
};
