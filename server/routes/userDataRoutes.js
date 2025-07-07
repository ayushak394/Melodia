const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleWare');
const User = require('../models/User');

router.get('/fetchusername', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('username');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ username: user.username });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
