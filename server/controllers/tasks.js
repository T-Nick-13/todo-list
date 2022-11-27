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
  /* const newcard = req.files.map((f) => {
    const path = f.path.replace(/\\/g, '/');
    const name = Array.isArray(req.body.name) ? req.body.name[req.files.indexOf(f)] : req.body.name;
    const tag = Array.isArray(req.body.tag) ? req.body.tag[req.files.indexOf(f)] : req.body.tag;
    return { nameEn: name, tag: tag, link: 'https://api.stafeeva.site/' + 'pictures/' + f.filename, filePath: path }
  }) */

  const path = 'http://localhost:3005/' + 'pictures/' + req.files[0].filename;
  debugger

  const newTask = req.body;
  Task.create({ title: newTask.title, description: newTask.description, file: path,
    term: newTask.term, status: newTask.status })
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


module.exports = {
  createTask, getTasks, deleteCard
};
