const express = require('express');
const router = express.Router();
const betController = require('../controllers/betController');

// Route to join a game and place a bet
router.post('/join-game', betController.joinGame);

// Route to fetch all bets for a specific client
router.get('/client-bets/:clientId', betController.getClientBets);

// Route to fetch current bets (games in "running" state) for a specific client
router.get('/client-bets/:clientId/current', betController.getCurrentBets);

module.exports = router;
