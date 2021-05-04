const { Router } = require('express');
const router = Router();

const {
  removeColor,
  removeImage,
  removeSize,
} = require('../controllers/product.controller');
const { deleteCurrency } = require('../controllers/payment.controller');

// * api/add/
// * api/remove/category/:id
// * api/remove/color/:id
// * api/remove/image/:id
// * api/remove/size/:id
router.delete('/color/:id', removeColor);

router.delete('/image/:id', removeImage);
router.delete('/size/:id', removeSize);

router.delete('/currency/:id', deleteCurrency);

module.exports = router;
