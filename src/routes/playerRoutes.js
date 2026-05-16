const router = require('express').Router();

const playerController = require('../controllers/playerController');

const auth = require('../middleware/auth');

router.get('/profile', auth, playerController.getProfile);

module.exports = router;