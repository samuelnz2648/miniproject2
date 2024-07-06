// backend/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { users, findUserByUsername, addUser } = require("../userStore");

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const existingUser = findUserByUsername(username);
  if (existingUser) {
    return res.status(400).json({ message: "User already registered." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  addUser({ username, password: hashedPassword, todoLists: [] });
  res.status(201).json({ message: "User registered." });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = findUserByUsername(username);
  if (!user) {
    return res.status(400).json({ message: "Invalid username or password." });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid username or password." });
  }

  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET);
  res.json({ token });
});

module.exports = router;
