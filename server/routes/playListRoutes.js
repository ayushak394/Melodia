const express = require("express");
const router = express.Router();
const Playlist = require("../models/playlist");
const authenticateToken = require("../middleware/authMiddleWare");

router.get("/", authenticateToken, async (req, res) => {
  try {
    const playlists = await Playlist.find({ userId: req.user.id }).populate("songs");
    res.json(playlists);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch playlists" });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  try {
    const { name } = req.body;
    const newPlaylist = new Playlist({ userId: req.user.id, name });
    await newPlaylist.save();
    res.status(201).json(newPlaylist);
  } catch (err) {
    res.status(500).json({ error: "Failed to create playlist" });
  }
});

router.post("/:playlistId/add", authenticateToken, async (req, res) => {
  try {
    const { songId } = req.body;
    const playlist = await Playlist.findOne({
      _id: req.params.playlistId,
      userId: req.user.id,
    });

    if (!playlist) return res.status(404).json({ error: "Playlist not found" });

    if (!playlist.songs.includes(songId)) {
      playlist.songs.push(songId);
      await playlist.save();
    }

    res.json(playlist);
  } catch (err) {
    res.status(500).json({ error: "Failed to add song to playlist" });
  }
});

router.patch("/:playlistId", authenticateToken, async (req, res) => {
  const { playlistId } = req.params;
  const { name } = req.body;

  try {
    const playlist = await Playlist.findOneAndUpdate(
      { _id: playlistId, userId: req.user.id },
      { name },
      { new: true }
    );

    if (!playlist)
      return res.status(404).json({ message: "Playlist not found." });

    res.json(playlist);
  } catch (err) {
    console.error("Rename error:", err);
    res.status(500).json({ message: "Failed to rename playlist." });
  }
});

router.delete("/:playlistId/songs/:songId", authenticateToken, async (req, res) => {
  const { playlistId, songId } = req.params;

  try {
    const playlist = await Playlist.findOne({
      _id: playlistId,
      userId: req.user.id,
    });

    if (!playlist)
      return res.status(404).json({ message: "Playlist not found." });

    playlist.songs = playlist.songs.filter((id) => id.toString() !== songId);
    await playlist.save();

    res.json({ message: "Song removed successfully.", playlist });
  } catch (err) {
    console.error("Remove song error:", err);
    res.status(500).json({ message: "Failed to remove song." });
  }
});

router.delete("/:playlistId", authenticateToken, async (req, res) => {
  try {
    const { playlistId } = req.params;
    const deleted = await Playlist.findOneAndDelete({
      _id: playlistId,
      userId: req.user.id,
    });

    if (!deleted)
      return res.status(404).json({ message: "Playlist not found." });

    res.json({ message: "Playlist deleted successfully." });
  } catch (err) {
    console.error("Delete playlist error:", err);
    res.status(500).json({ message: "Failed to delete playlist." });
  }
});

module.exports = router;
