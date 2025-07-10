const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const cloudinary = require("../config/cloudinary"); // Make sure path is correct

// Generate JWT
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// ✅ Signup Controller
exports.signupUser = async (req, res) => {
  try {
    let { username, email, password, role = "user", phone } = req.body;
    if (role === "admin") role = "pending-admin";

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists." });
    }

    const user = new User({ username, email, password, role, phone });
    await user.save();

    const token = generateToken(user);

    res.status(201).json({
      message:
        role === "pending-admin"
          ? "Admin request submitted. You'll receive an email if approved."
          : "Account created successfully! Redirecting to login...",
      token,
      user: { id: user._id, username, email, role },
    });
  } catch (err) {
    console.error("Signup error:", err.message);
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};

// ✅ Login Controller
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // ✅ Block pending-admins
    if (user.role === "pending-admin") {
      return res.status(403).json({
        message:
          "Your admin request is under review. You'll be notified once approved.",
      });
    }

    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, username: user.username, email, role: user.role },
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

// ✅ Forgot Password Controller
exports.forgotPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res
      .status(400)
      .json({ message: "Email and new password are required." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found." });

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successfully." });
  } catch (err) {
    console.error("Reset password error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Token Validation Controller
exports.validateToken = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      return res.status(401).json({ message: "Access token required." });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found." });

    res.status(200).json({ message: "Token valid", user });
  } catch (err) {
    console.error("Token validation error:", err.message);
    res.status(401).json({ message: "Invalid or expired token." });
  }
};

// ✅ Upload Profile Image to Cloudinary
exports.uploadProfileImage = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!req.file) {
      return res.status(400).json({ message: "No image provided" });
    }

    // Upload buffer to Cloudinary
    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "profiles" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        stream.end(buffer);
      });
    };

    const result = await streamUpload(req.file.buffer);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profileImage: result.secure_url },
      { new: true }
    ).select("-password");

    res
      .status(200)
      .json({ message: "Profile image updated", user: updatedUser });
  } catch (error) {
    console.error("Upload error:", error.message);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};

// 🔒 Only devs with secret can access these
exports.getPendingAdmins = async (req, res) => {
  const { devSecret } = req.query;
  if (devSecret !== process.env.DEV_SECRET) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  const pendingAdmins = await User.find({ role: "pending-admin" }).select(
    "-password"
  );
  res.status(200).json({ pendingAdmins });
};

const emailjs = require("@emailjs/nodejs");

// ✅ Admin approval controller
exports.approveAdminRequest = async (req, res) => {
  const { devSecret, userId } = req.body;

  if (devSecret !== process.env.DEV_SECRET) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  const user = await User.findById(userId);
  if (!user || user.role !== "pending-admin") {
    return res.status(404).json({ message: "Pending admin not found." });
  }

  user.role = "admin";
  await user.save();

  try {
    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID_ADMIN_APPROVED,
      {
        user_email: user.email,
        user_name: user.username,
        name: "Melodia Team",
        email: "support@melodia.com",
      },
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY,
        privateKey: process.env.EMAILJS_PRIVATE_KEY,
      }
    );
    console.log("✅ Approval email sent to:", user.email);
  } catch (err) {
    console.error("❌ Failed to send approval email:", err);
  }

  res.status(200).json({ message: "Admin approved successfully." });
};
