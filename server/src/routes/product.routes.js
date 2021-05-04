const { Router } = require('express');
const router = Router();
const multer = require('multer');
const multerConfig = require('../config/multer');
const {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require('../controllers/product.controller');

// * api/Products/
router.post('/', multer(multerConfig).single('file'), createProduct);
router.get('/', getProducts);

// * api/Products/:id
router.get('/:id', getProduct);
router.delete('/:id', deleteProduct);
router.put('/:id', updateProduct);

module.exports = router;
