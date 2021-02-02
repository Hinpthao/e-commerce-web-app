const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category');
const { authenticateJWT } = require('../middleware/authenticator');
const upload = require('../middleware/multer');

router.post('/', authenticateJWT , upload.single('imageCategory'), categoryController.create);
router.get('/', authenticateJWT , categoryController.readAll);
router.put('/update/:id', authenticateJWT , categoryController.update);
router.delete('/delete/:id', authenticateJWT , categoryController.delete);

module.exports = router;