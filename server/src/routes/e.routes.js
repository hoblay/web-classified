const { Router } = require('express');
const router = Router();

const { createTodo, getTodo, getTodos, updateTodo, deleteTodo } = require('../controllers/todo.controller');

// * api/todos/
router.post('/', createTodo);
router.get('/', getTodos);

// * api/todos/:id
router.get('/:id', getTodo);
router.delete('/:id', deleteTodo);
router.put('/:id', updateTodo);

module.exports = router;
