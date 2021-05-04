const { Router } = require('express');
const router = Router();

// * Importing controllers
const { createOrder, getOrder } = require('../controllers/order.controller');

// * Importing middlewares
const auth = require('../middleware/auth.middleware');

// * api/order/

router.post('/', auth, createOrder);
router.get('/:id', auth, getOrder);

module.exports = router;
