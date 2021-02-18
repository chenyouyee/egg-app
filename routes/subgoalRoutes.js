module.exports = app => {
    const goal = require("../controllers/subgoalController.js");
  
    var router = require("express").Router();

    router.get("/all/:parentId", goal.getAll)

    // Create a new Goal
    router.post("/", goal.create);
  
    // Delete a Goal with id
    router.delete("/:id", goal.delete);
  
    app.use('/api/subgoal', router);
  };