require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const User = require('./models/User');
const Aquarium = require('./models/Aquarium');

const app = express();

// MongoDB Connection
const uri = process.env.MONGO_URI;
mongoose.connect(uri);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => console.log('MongoDB connected successfully!'));

// Middleware
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173"], // Allow both origins
  methods: "GET,POST,PUT,DELETE",
  credentials: true // Allow cookies, if needed
}));// Adjust frontend origin
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Multer (Temporary file storage)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, file.originalname),
});
const upload = multer({ storage });

// Generate Tokens
const generateAccessToken = (userId) => jwt.sign({ userId }, process.env.ACCESS_SECRET, { expiresIn: '15m' });
const generateRefreshToken = (userId) => jwt.sign({ userId }, process.env.REFRESH_SECRET, { expiresIn: '7d' });

// 🔹 Sign-Up Route
app.post('/api/signup', async (req, res) => {
  const { username, password, email } = req.body;
  const existingUser = await User.findOne({ username });
  if (existingUser) return res.status(400).json({ message: 'Username already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword, email });
  await user.save();

  res.status(201).json({ message: 'User signed up successfully' });
});

// 🔹 Login Route (Stores refresh token in HTTP-only cookie)
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true, secure: true, sameSite: 'Strict'
  });

  res.json({ accessToken });
});

// 🔹 Refresh Token Route (Provides new access token)
app.post('/api/refresh-token', (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ message: 'No refresh token' });

  jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid refresh token' });

    const newAccessToken = generateAccessToken(decoded.userId);
    res.json({ accessToken: newAccessToken });
  });
});

// 🔹 Logout Route (Clears refresh token)
app.post('/api/logout', (req, res) => {
  res.clearCookie('refreshToken');
  res.status(200).json({ message: 'Logged out successfully' });
});

// 🔹 Auth Middleware for Protected Routes
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid Token' });
    req.userId = decoded.userId;
    next();
  });
};

// Start server
app.listen(3001, () => console.log('Server running on http://localhost:3001'));
