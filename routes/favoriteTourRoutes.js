const express = require('express');
const router = express.Router();
const {
  addFavoriteTour,
  removeFavoriteTour,
  getFavoriteTours,
} = require('../controllers/favoriteTourController');

// Route to add a tour to favorites
router.post('/add', addFavoriteTour);

// Route to remove a tour from favorites
router.delete('/remove', removeFavoriteTour);

// Route to get all favorite tours for a user
router.get('/:userId', getFavoriteTours);

module.exports = router;
