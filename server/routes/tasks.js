const router = require('express').Router();
const { createTask, getTasks, deleteCard, editTask } = require('../controllers/tasks');
const upload = require('../middlewares/upload');

router.post('/', upload, createTask);
router.get('/', getTasks);
router.delete('/:cardId', deleteCard);
router.post('/_method=PUT', upload, editTask);

module.exports = router;
