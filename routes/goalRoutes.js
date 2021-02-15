module.exports = app => {
    const goal = require("../controllers/goalController.js");
  
    var router = require("express").Router();

    // test route
    router.get("/test", goal.test);

    router.get("/all", goal.getAll)

    // Create a new Goal
    router.post("/", goal.create);
  
    // Delete a Goal with id
    router.delete("/:id", goal.delete);
  
    app.use('/api/goal', router);
  };