const { Router } = require('express');
const router = Router();

const {
  createProperty,
  getProperty,
  getProperties,
  updateProperty,
  deleteProperty,
} = require('../controllers/property.controller');

// * api/property/
router.post('/', createProperty);
router.get('/', getProperties);

// * api/property/:id
router.get('/:id', getProperty);
router.delete('/:id', deleteProperty);
router.put('/:id', updateProperty);

module.exports = router;
