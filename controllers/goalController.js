const { sequelize, Goal, Subgoal } = require("../db/models");

exports.getAll = (req, res) => {
  Goal.findAll()
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving goals."
        });
    })
}

// Create and Save a new Goal
exports.create = (req, res) => {
    // Validate request
    if (!req.body.content) {
        res.status(400).send({
          message: "Content is empty my friend"
        });
        return;
    }

    // Create a Goal
    const goal = {
      content: req.body.content,
      userId: "1", // hardcode user id for now
    };

    // Save Goal in the database
    Goal.create(goal)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while creating the Goal."
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    try {
      sequelize.transaction(async (t) => {
        await Goal.destroy({ where: { id: id }, transaction: t })
        await Subgoal.destroy({ where: { goalId: id }, transaction: t })
        res.send({ message: "Goal was deleted successfully!" })
      })
    } catch(err) {
      res.status(500).send({ error: err, message: "Could not delete Goal with id=" + id });
      console.log(err)
    }
};
  