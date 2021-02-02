const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middleware/authenticator');
const upload = require('../middleware/multer');
const productController = require('../controllers/product');

router.post('/', authenticateJWT, upload.array('productImage', 5), productController.create )
router.get('/', productController.readAll)
router.get('/:productSlug', productController.getProductDetail)
router.get('/category/:categorySlug', productController.getProductsByCategory)
router.get('/collections/sale', productController.getProductsSale)
router.get('/collections/new', productController.getProductsNew)
router.get('/collections/bestSeller', productController.getProductsBestSeller)
router.delete('/:productId', authenticateJWT, productController.delete)
router.put('/:productId', authenticateJWT, upload.array('productImages', 10), productController.update)
router.get('/search/query', productController.search)

module.exports = router;