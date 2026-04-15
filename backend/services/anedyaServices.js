const simulator = require("../simulator");
const DeviceHistory = require("../models/DeviceHistory");
const socket = require("../socket");

let relayState = false;

/* ===========================
   GET LIVE DATA
=========================== */
exports.getLiveData = async () => {
  return {
    relay: relayState,
    status: relayState ? "online" : "offline",
  };
};

/* ===========================
   GET HISTORY (ONLY DB)
=========================== */
exports.getHistory = async () => {
  const existing = await DeviceHistory.findOne();
  return existing ? existing.data : [];
};

/* ===========================
   TOGGLE RELAY
=========================== */
exports.toggleRelay = async () => {
  relayState = !relayState;

  simulator.setRelay(relayState);

  if (relayState) {
    simulator.startSimulator();
  } else {
    simulator.stopSimulator();
  }

  // 🔥 ONLY RELAY VIA SOCKET
  socket.getIO().emit("relayUpdated", {
    relay: relayState,
    status: relayState ? "online" : "offline",
  });

  return { relay: relayState };
};
