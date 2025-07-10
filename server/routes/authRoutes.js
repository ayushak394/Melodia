const express = require("express");
const router = express.Router();

const {
  signupUser,
  loginUser,
  forgotPassword,
  validateToken,
  approveAdminRequest,
  getPendingAdmins,
} = require("../controllers/authController");

const authenticateToken = require("../middleware/authMiddleWare");

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/forgotpassword", forgotPassword);
router.get("/validate", authenticateToken, validateToken);

router.get("/pending-admins", getPendingAdmins);
router.post("/approve-admin", approveAdminRequest);

module.exports = router;
