const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const User = require("../schemas/user");
const router = express.Router();
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

let refreshTokens = [];

const generateAccessToken = (user) => {
  return jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "15m" });
};

const verifyToken = (req, res, next) => {
  const accessToken = req.cookies.auth_token; // Use auth_token as cookie name
  console.log(accessToken);
  if (!accessToken) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  jwt.verify(accessToken, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = decoded;
    next();
  });
};

router.get("/protected", verifyToken, (req, res) => {
  res.status(200).json({ message: "Welcome to the protected route!" });
});

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const accessToken = generateAccessToken(user);
    console.log("tokeeen ===== ",accessToken)
    const refreshToken = jwt.sign({ userId: user._id }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

    refreshTokens.push(refreshToken);

    res.cookie("auth_token", accessToken, { // Changed the cookie name to 'auth_token'
      httpOnly: true,  // No longer HTTP-only, accessible via JavaScript
      secure: false, // Use 'true' in production for secure cookies (https)
      maxAge: 15 * 60 * 1000, // 15 minutes
    });
    
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,  // No longer HTTP-only, accessible via JavaScript
      secure: false, // Use 'true' in production for secure cookies (https)
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

  
      
    console.log("Logged in successfully");

    res.json({ message: "Logged in successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post("/logout", (req, res) => {
  const refreshToken = req.cookies.refresh_token;
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

  res.clearCookie("auth_token");
  res.clearCookie("refresh_token");
  res.json({ message: "Logged out successfully" });
});

module.exports = router;
