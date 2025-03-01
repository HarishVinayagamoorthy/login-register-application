const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const auth_middleware = require("../middleware/authmiddleware");

const router = express.Router();

//REGISTER API
router.post("/register", async (req, res) => {
  const { name, dob, email, password } = req.body;
  try {
    const hashed_password = await bcrypt.hash(password, 10);

    const new_user = new User({ name, dob, email, password: hashed_password });

    await new_user.save();
    res.status(201).json({ message: "User registered succesfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//LOGIN API
router.post("/login", async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const is_match = await bcrypt.compare(password, user.password);
    if (!is_match) {
      return res.status(404).json({ message: "Invalid crendetials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "login server error" });
  }
});

//GET ALL DETAILS API
router.get("/get", auth_middleware, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error in get details" });
  }
});

module.exports = router;
