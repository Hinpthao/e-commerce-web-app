const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');
const { authenticateJWT } = require('../middleware/authenticator');

router.post('/create', orderController.create )
router.get('/:userId', authenticateJWT, orderController.getOrdersByUserId )
router.get('/', authenticateJWT, orderController.getOrders )
router.put('/:orderId', authenticateJWT, orderController.updateOrder )

module.exports = router;