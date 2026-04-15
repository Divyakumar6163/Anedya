const router = require("express").Router();
const {
  register,
  login,
  setPassword,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/set-password", setPassword);
module.exports = router;
