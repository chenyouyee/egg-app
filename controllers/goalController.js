const { Goal } = require("../db/models");
const { Op } = require('sequelize')

// Test route
exports.test = (req, res) => {
  res.json({ message: "Hello from goal route" });
};

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
  console.log("-----")
  console.log(req.body)
  console.log("-----")

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
      user: "1", // hardcode user id for now
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
  
    Goal.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Goal was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Goal with id=${id}. Maybe Goal was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Goal with id=" + id
        });
      });
  };