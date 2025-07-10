const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const Song = require("../models/song");

const {
  getSongs,
  toggleLikeSong,
  getLikedSongs,
  getTrendingSongs,
  getPublicSongById,
} = require("../controllers/songController");

const authenticateToken = require("../middleware/authMiddleWare");
const requireAdmin = require("../middleware/requireAdmin");

// ================== SONG FETCHING & LIKING ROUTES ==================
router.get("/trending", getTrendingSongs);
router.get("/", getSongs);
router.get("/public/:id", getPublicSongById);

router.post("/:songId/like", authenticateToken, toggleLikeSong);
router.get("/liked", authenticateToken, getLikedSongs);

// ================== ADMIN SONG UPLOAD ==================

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const folder =
      file.fieldname === "audio" ? "melodia-audio" : "melodia-images";
    return {
      folder,
      resource_type: file.fieldname === "audio" ? "video" : "image",
      allowed_formats:
        file.fieldname === "audio" ? ["mp3", "wav"] : ["jpg", "jpeg", "png"],
    };
  },
});

// Configure multer with file size limits and storage
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Set a general 10MB limit for all files (can be adjusted per field in route if needed)
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "audio" && !file.mimetype.startsWith("audio/")) {
      return cb(new Error("Only audio files are allowed."));
    }
    if (file.fieldname === "image" && !file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed."));
    }
    cb(null, true);
  },
});

// POST /api/songs/upload (admin only)
router.post(
  "/upload",
  authenticateToken,
  requireAdmin,
  upload.fields([
    { name: "audio", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { title, artist, genre, mood, duration } = req.body;
      const audioFile = req.files["audio"]?.[0];
      const imageFile = req.files["image"]?.[0];

      if (
        !title ||
        !artist ||
        !genre ||
        !mood ||
        !duration ||
        !audioFile ||
        !imageFile
      ) {
        return res.status(400).json({
          message:
            "All fields (title, artist, genre, mood, duration, audio, image) are required.",
        });
      }

      const parsedDuration = parseInt(duration, 10);
      if (isNaN(parsedDuration)) {
        return res
          .status(400)
          .json({ message: "Duration must be a valid number." });
      }

      // Additional size validation in the route if needed
      if (audioFile.size > 10 * 1024 * 1024) {
        return res
          .status(400)
          .json({ message: "Audio file size must be under 10MB." });
      }
      if (imageFile.size > 5 * 1024 * 1024) {
        return res
          .status(400)
          .json({ message: "Image file size must be under 5MB." });
      }

      const newSong = new Song({
        title,
        artist,
        audio: audioFile.path,
        genre,
        mood,
        duration: parsedDuration,
        image: imageFile.path,
      });

      await newSong.save();
      res
        .status(201)
        .json({ message: "Song uploaded successfully", song: newSong });
    } catch (err) {
      console.error("Upload error details:", {
        message: err.message,
        stack: err.stack,
        code: err.code,
      });
      if (err.name === "ValidationError") {
        return res
          .status(400)
          .json({ message: "Validation error", error: err.message });
      }
      if (err.name === "MulterError") {
        return res
          .status(400)
          .json({ message: "File upload error", error: err.message });
      }
      res
        .status(500)
        .json({ message: "Failed to upload song.", error: err.message });
    }
  }
);

module.exports = router;
