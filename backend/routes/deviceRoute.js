const router = require("express").Router();

const {
  getDevices,
  getHistory,
  toggleRelay,
} = require("../controllers/deviceController");

const { protect, authorize } = require("../middleware/authMiddleware");
router.get("/", protect, getDevices);
router.get("/history", protect, getHistory);
router.post("/relay", protect, authorize("admin", "operator"), toggleRelay);

module.exports = router;
