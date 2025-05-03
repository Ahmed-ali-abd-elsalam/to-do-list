const express = require('express');
const router = express.Router();
const { validate } = require('../utils/tokenUtils');
const TaskController = require('../Controllers/taskController');
const { createTask, editTask, getAllTasks, deleteTask, findTaskByTitle } = TaskController;

router.post('/create', validate, createTask);
router.put('/edit', validate, editTask);
router.get('/', validate, getAllTasks);
router.get('/search', validate, findTaskByTitle);
router.delete('/delete', validate, deleteTask);

module.exports = router;