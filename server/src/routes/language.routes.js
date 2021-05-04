const { Router } = require('express');
const router = Router();

const {
  createLanguage,
  getLanguage,
  getLanguages,
  updateLanguage,
  deleteLanguage,
} = require('../controllers/language.controller');

// * api/languages/
router.post('/', createLanguage);
router.get('/', getLanguages);

// * api/languages/:id
router.get('/:id', getLanguage);
router.delete('/:id', deleteLanguage);
router.put('/:id', updateLanguage);

module.exports = router;
