const { Router } = require('express');
const router = Router();

// * Importing controllers
const {
  user,
  getUser,
  profile,
  getAll,
  createAdress,
  deleteAdress,
} = require('../controllers/user.controller');

// * Importing middlewares
const auth = require('../middleware/auth.middleware');
const { createOrder } = require('../controllers/order.controller');

router.get('/', auth, user);
router.get('/all', getAll);
router.get('/profile', auth, profile);
router.get('/:id', getUser);

router.post('/adress', auth, createAdress);
router.post('/order', auth, createOrder);
router.delete('/adress/:id', auth, deleteAdress);

module.exports = router;
