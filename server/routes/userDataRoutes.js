// ✅ BACKEND (userRoutes.js)
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleWare");
const User = require("../models/User");
const Playlist = require("../models/playlist");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");

// Setup multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ Fetch only username
router.get("/fetchusername", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("username");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ username: user.username });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ Fetch full profile
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("username email createdAt likedSongs bio role profileImage")
      .populate("likedSongs", "title genre artist");

    if (!user) return res.status(404).json({ message: "User not found" });

    const playlists = await Playlist.find({ userId: req.user.id });
    res.status(200).json({ ...user._doc, playlists });
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Update profile fields
router.put("/update", verifyToken, async (req, res) => {
  const { username, bio } = req.body;
  if (username && username.length < 3) {
    return res
      .status(400)
      .json({ message: "Username must be at least 3 characters long." });
  }

  try {
    const updatedFields = {};
    if (username) updatedFields.username = username;
    if (bio !== undefined) updatedFields.bio = bio;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      updatedFields,
      { new: true, runValidators: true }
    ).select("username bio");

    if (!updatedUser) return res.status(404).json({ message: "User not found." });

    res.status(200).json({
      message: "Profile updated successfully.",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Upload profile image
router.put("/upload-profile", verifyToken, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided." });
    }

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
      req.user.id,
      { profileImage: result.secure_url },
      { new: true }
    ).select("username bio profileImage");

    res.status(200).json({
      message: "Profile image updated successfully.",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Error uploading profile image:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
