const router = require('express').Router();
const { createTask, getTasks, deleteCard } = require('../controllers/tasks');
const upload = require('../middlewares/upload');

router.post('/', upload, createTask);
router.get('/', getTasks);
router.delete('/:cardId', deleteCard);

module.exports = router;
