const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middleware/authenticator');
const userController = require('../controllers/user');

router.put('/update/:userId', authenticateJWT, userController.update )
router.get('/allCustomers', authenticateJWT, userController.getAllCustomers )

module.exports = router;