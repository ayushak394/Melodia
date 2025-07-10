const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  audio: { type: String, required: true }, // Changed from audioUrl to audio
  genre: { type: String, required: true },
  mood: { type: String, required: true },
  duration: { type: Number, required: true },
  releaseDate: { type: Date, default: Date.now },
  trendingScore: { type: Number, default: 0 },
  image: { type: String, required: true }, // Changed from imageUrl to image
  playCount: { type: Number, default: 0 },
});

module.exports = mongoose.models.Song || mongoose.model("Song", songSchema);