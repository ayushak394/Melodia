const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware");
const Like = require("../models/like");
const Song = require("../models/song");

router.get("/", authenticateToken, async (req, res) => {
  const likes = await Like.find({ userId: req.user.id }).populate("songId");
  res.json(likes.map((l) => l.songId));
});

router.post("/toggle/:songId", authenticateToken, async (req, res) => {
  const { songId } = req.params;
  const existing = await Like.findOne({ userId: req.user.id, songId });
  if (existing) {
    await existing.deleteOne();
    return res.json({ message: "Unliked" });
  }
  await Like.create({ userId: req.user.id, songId });
  res.json({ message: "Liked" });
});

module.exports = router;
