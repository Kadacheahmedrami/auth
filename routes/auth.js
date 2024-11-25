const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../schemas/user'); 
const router = express.Router();


const JWT_SECRET = 'your_access_token_secret';
const REFRESH_TOKEN_SECRET = 'your_refresh_token_secret';


let refreshTokens = []; 

router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(username)
    console.log(email)
    console.log(password)
  
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }


    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const user = new User({ username, email, password });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error ', error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

   
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    
    const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

 
    const refreshToken = jwt.sign({ userId: user._id }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

   
    refreshTokens.push(refreshToken);

    res.status(200).json({
      message: 'Login successful',
      accessToken,
      refreshToken
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


router.post('/token', (req, res) => {
  const { refreshToken } = req.body;

 
  if (!refreshToken || !refreshTokens.includes(refreshToken)) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  
  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }

  
    const accessToken = jwt.sign({ userId: user.userId }, JWT_SECRET, { expiresIn: '1h' });


    res.json({ accessToken });
  });
});


router.post('/logout', (req, res) => {
  const { refreshToken } = req.body;


  refreshTokens = refreshTokens.filter(token => token !== refreshToken);

  res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;
