const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const { Server } = require("socket.io");

let io;

module.exports = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    socket.on("joinDevice", (deviceId) => {
      socket.join(deviceId);
      console.log(`Socket ${socket.id} joined device ${deviceId}`);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
};
module.exports.getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};
