const express = require('express');
const router = express.Router();
const { signupUser, loginUser, forgotPassword, validateToken } = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware');


router.post('/signup', signupUser);
router.post('/login', loginUser);
router.get('/validate', authenticateToken, validateToken);
router.post('/forgotpassword', forgotPassword);

module.exports = router;
