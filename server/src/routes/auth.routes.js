const { Router } = require('express');
const router = Router();

// * Importing controllers
const { register, login, verify } = require('../controllers/auth.controller');

// * Importing middlewares
const auth = require('../middleware/auth.middleware');
const validData = require('../middleware/validData.middleware');


// * api/auth/
router.post('/register',validData, register);
router.post('/login', validData, login);

router.get('/', auth, verify)


module.exports = router;
