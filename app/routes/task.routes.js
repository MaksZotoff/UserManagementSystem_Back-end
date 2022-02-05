module.exports = function(app) {
    const taskcontroller = require("../controllers/task.controller");

    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    app.get("/task/", taskcontroller.findAll);
    app.get("/task/:id", taskcontroller.findOne);
    app.post("/task", taskcontroller.create);
    app.put("/task/:id", taskcontroller.update);
    app.delete("/task/:id", taskcontroller.delete);
    
  };