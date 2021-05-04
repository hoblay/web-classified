const { Router } = require('express');
const router = Router();
const multer = require('multer');
const multerConfig = require('../config/multer');

const {
  addCategory,
  addColor,
  addImage,
  addSize,
} = require('../controllers/product.controller');

const { createCurrency } = require('../controllers/payment.controller');

// * api/add/

// * api/add/category/:id
router.post('/category/:id', addCategory);

// * api/add/color/:id
router.post('/color/:id/', addColor);

// * api/add/image/:id
router.post('/image/:id', multer(multerConfig).single('file'), addImage);

// * api/add/size/:id
router.post('/size/:id', addSize);

// * api/add/currency/
router.post('/currency', createCurrency);

module.exports = router;
