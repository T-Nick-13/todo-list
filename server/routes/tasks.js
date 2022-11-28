const router = require('express').Router();
const { createTask, getTasks, deleteTask, editTask } = require('../controllers/tasks');
const upload = require('../middlewares/upload');

router.post('/', upload, createTask);
router.get('/', getTasks);
router.delete('/:taskId', deleteTask);
router.post('/_method=PUT', upload, editTask);

module.exports = router;
