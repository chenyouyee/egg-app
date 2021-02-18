const { Subgoal } = require("../db/models");
const { Op } = require('sequelize')

exports.getAll = (req, res) => {
  const parentId = req.params.parentId

  Subgoal.findAll({
      where: { goalId: parentId }
  })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving subgoals."
        });
    })
}

// Create and Save a new Subgoal
exports.create = (req, res) => {
    // Validate request
    if (!req.body.content) {
        res.status(400).send({
          message: "Content is empty my friend"
        });
        return;
    }

    // Create a Subgoal
    const subgoal = {
      content: req.body.content,
      userId: "1", // hardcode user id for now
      goalId: req.body.goalId
    };

    // Save Subgoal in the database
    Subgoal.create(subgoal)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while creating the Subgoal."
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Subgoal.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Subgoal was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Subgoal with id=${id}. Maybe Subgoal was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Subgoal with id=" + id
        });
      });
  };