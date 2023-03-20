const db = require("../models");
const Task = db.tasks;

exports.create = (req, res) => {

  if (!req.body.name) {
    res.status(400).send({ message: "Le contenu ne peut pas être vide !" });
    return;
  }

  const task = new Task({
    name: req.body.name,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });

  task
    .save(task)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenue lors de la création de la tâche."
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Task.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenue lors de la récupération des tâches."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Task.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Tâche introuvable avec l'identifiant :" + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Erreur lors de la récupération de la tâche avec l'identifiant :" + id });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Les données à mettre à jour ne peuvent pas être vides !"
    });
  }

  const id = req.params.id;

  Task.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Impossible de mettre à jour la tâche avec l'identifiant ${id}. Peut-être que la tâche n'a pas été trouvée !`
        });
      } else res.send({ message: "La tâche a été mise à jour avec succès." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Erreur lors de la mise à jour de la tâche avec l'identifiant :" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Task.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Impossible de supprimer la tâche avec l'identifiant ${id}. Peut-être que la tâche n'a pas été trouvée !`
        });
      } else {
        res.send({
          message: "La tâche a été supprimée avec succès !"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Impossible de supprimer la tâche avec l'identifiant : " + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Task.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Les tâches ont été supprimées avec succès !`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenue lors de la suppression de toutes les tâches."
      });
    });
};

exports.findAllPublished = (req, res) => {
  Task.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenue lors de la récupération des tâches."
      });
    });
};
