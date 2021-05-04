const { Router } = require('express');
const router = Router();

const multer = require('multer');
const multerConfig = require('../config/multer');

const {
  createCategory,
  getCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require('../controllers/category.controller');

// * api/category/
router.post('/', multer(multerConfig).single('file'), createCategory);
router.get('/', getCategories);

// * api/category/:id
router.get('/:id', getCategory);
router.delete('/:id', deleteCategory);
router.put('/:id', multer(multerConfig).single('file'), updateCategory);

module.exports = router;
