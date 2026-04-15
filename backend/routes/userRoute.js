const router = require("express").Router();
const {
  getUsers,
  updateUserRole,
  createUser,
  deleteUser,
} = require("../controllers/userController");

const { protect, authorize } = require("../middleware/authMiddleware");

router.get("/", protect, authorize("admin"), getUsers);

router.post("/", protect, authorize("admin"), createUser);

router.put("/:id", protect, authorize("admin"), updateUserRole);

router.delete("/:id", protect, authorize("admin"), deleteUser);

module.exports = router;
