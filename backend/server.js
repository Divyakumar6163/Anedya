require("dotenv").config();
const http = require("http");
const mongoose = require("mongoose");

const app = require("./src/app");
const initSocket = require("./socket");
const server = http.createServer(app);

initSocket(server);
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => {
    console.error("DB Error:", err.message);
    process.exit(1);
  });

const port = process.env.PORT || 10000;

server.listen(port, () => {
  console.log(`Server running on port ${port} 🚀`);
});
