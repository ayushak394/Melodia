const Song = require("../models/song");
const User = require("../models/User");

const getSongs = async (req, res) => {
  try {
    const { search, genre, artist, sortBy, page = 1, limit = 10 } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { artist: { $regex: search, $options: "i" } },
      ];
    }

    if (genre) query.genre = genre;
    if (artist) query.artist = { $regex: artist, $options: "i" };

    let sortOptions = {};
    switch (sortBy) {
      case "newest":
        sortOptions = { releaseDate: -1 };
        break;
      case "oldest":
        sortOptions = { releaseDate: 1 };
        break;
      case "shortest":
        sortOptions = { duration: 1 };
        break;
      case "longest":
        sortOptions = { duration: -1 };
        break;
      default:
        sortOptions = {};
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const songs = await Song.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Song.countDocuments(query);

    res.json({
      songs,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching songs", error: error.message });
  }
};

const toggleLikeSong = async (req, res) => {
  const userId = req.user.id;
  const songId = req.params.songId;

  try {
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    const index = user.likedSongs.indexOf(songId);

    if (index === -1) {
      user.likedSongs.push(songId); 
    } else {
      user.likedSongs.splice(index, 1); 
    }

    await user.save();
    res.status(200).json({ liked: index === -1 });
  } catch (error) {
    console.error("Error toggling like:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getLikedSongs = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("likedSongs");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ likedSongs: user.likedSongs });
  } catch (error) {
    console.error("Error fetching liked songs:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getTrendingSongs = async (req, res) => {
  try {
    const songs = await Song.find({})
      .sort({ trendingScore: -1 })
      .limit(5);

    res.status(200).json(songs);
  } catch (error) {
    console.error("Error fetching trending songs:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getPublicSongById = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(404).json({ message: "Song not found" });
    res.status(200).json(song);
  } catch (error) {
    console.error("Error fetching public song:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getSongs,
  toggleLikeSong,
  getLikedSongs,
  getTrendingSongs,
  getPublicSongById, 
};
