const router = require('express').Router();

const marchController = require('../controllers/marchController');

const auth = require('../middleware/auth');

router.post('/create', auth, marchController.createMarch);

router.get('/all', auth, marchController.getMarches);

router.post('/gather', auth, marchController.gatherResource);

module.exports = router;