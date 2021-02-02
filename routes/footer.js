const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middleware/authenticator');
const footerController = require('../controllers/footer');

router.post('/create',authenticateJWT, footerController.create )
router.get('/', footerController.get)
router.put('/:id', footerController.update)

module.exports = router;