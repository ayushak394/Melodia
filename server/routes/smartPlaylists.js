router.get("/smart-playlists", authenticateToken, async (req, res) => {
  const likedSongs = await Like.find({ userId: req.user.id }).populate("songId");
  const genres = likedSongs.map((like) => like.songId.genre);
  const topGenre = genres.sort((a,b) =>
    genres.filter(g => g === a).length - genres.filter(g => g === b).length
  ).pop();

  const recommended = await Song.find({ genre: topGenre }).limit(10);

  const playlist = new Playlist({
    userId: req.user.id,
    name: `Top Picks: ${topGenre}`,
    songs: recommended.map((s) => s._id),
  });

  await playlist.save();
  res.json(playlist);
});
