const express = require('express');
const router = express.Router();
const { adminLogin } = require('../controllers/adminController');
const { getOngoingGameDetails } = require('../controllers/adminGameController');
const { getLastGameResultsByMode } = require('../controllers/lastGameResultsController');
const authMiddleware = require('../middleware/authMiddleware');

// Admin login route
router.post('/login', adminLogin);

// Ongoing game details route (protected by authMiddleware)
router.get('/ongoing-game-details', authMiddleware, getOngoingGameDetails);

// Route to fetch last game results by mode (protected by authMiddleware)
router.get('/last-game-results', getLastGameResultsByMode);

module.exports = router;
