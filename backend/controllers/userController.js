const User = require("../models/User");

exports.getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};
exports.createUser = async (req, res) => {
  try {
    const { email, role } = req.body;

    const user = await User.create({
      email,
      role,
      password: "123456",
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: "Error creating user" });
  }
};
exports.updateUserRole = async (req, res) => {
  try {
    const { email, role } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { email, role },
      { new: true },
    );

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error updating user" });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user" });
  }
};
