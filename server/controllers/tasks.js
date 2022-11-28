const fs = require('fs');
const Task = require('../models/task');

const { Forbidden, NotFound, BadRequest } = require('../errors');

const getTasks = (req, res, next) => {
  Task.find({})
    .then((card) => {
      res.send(card);
    })
    .catch(next);
}

const createTask = (req, res) => {
  const path = (req.files.length > 0) ? 'http://localhost:3005/' + 'files/' + req.files[0].filename : '';
  const filName = (req.files.length > 0) ? req.files[0].originalname : '';
  const newTask = req.body;
  debugger
  Task.create({ title: newTask.title, description: newTask.description, file: path,
    term: newTask.term, status: newTask.status, fileName: filName})
    .then((card) => res.send(card))
    .catch((err) => {
      throw err;
  })
}

const deleteCard = (req, res, next) => {
  const cardId = req.params.cardId.split(',').map((card) => {
    return card;
  })

  Task.find({ _id: {$in : cardId}})
    .orFail(new NotFound('Нет фильма с таким id'))
    .then((card) => {
      card.forEach((c) => {
        c.remove()
          .then((card) => {
            fs.unlink(card.filePath, function(err){
              if (err) {
                console.log(err);
              } else {
                console.log("Файл удалён");
              }
            })
          })
        })
        res.send(card);
    })
    .catch((err) => {
      throw err;
    })
}

const editTask = (req, res, next) => {
  const { title, description, term, status, id } = req.body;
  const file = (req.files.length > 0) ? 'http://localhost:3005/' + 'files/' + req.files[0].filename : req.body.file;
  const filName = (req.files.length > 0) ? req.files[0].originalname : req.body.fileName;

  debugger
  Task.findByIdAndUpdate(
    id,
    { title, description, file, term, status, filName },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((u) => {
      if (!u) {
        throw new NotFound('Задача не найдена');
      }
      return res.send(u);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequest('Введены некорректные данные');
      }
      throw err;
    })
    .catch(next);
};


module.exports = {
  createTask, getTasks, deleteCard, editTask
};
