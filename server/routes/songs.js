const express = require('express');
const router = express.Router();

const {
  getSongs,
  toggleLikeSong,
  getLikedSongs,
  getTrendingSongs,
  getPublicSongById,
} = require('../controllers/songController');

const authenticateUser = require('../middleware/authMiddleWare');

router.get('/trending', getTrendingSongs); 

router.get('/', getSongs); 
router.get("/public/:id", getPublicSongById);

router.post('/:songId/like', authenticateUser, toggleLikeSong);
router.get('/liked', authenticateUser, getLikedSongs);

module.exports = router;
