const taskcontroller = require("../controllers/task.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    app.get("/task/", taskcontroller.findAll);
    app.get("/task/relevant", taskcontroller.findAllRelevant);
    app.get("/task/:id_task", taskcontroller.findOne);
    app.post("/task/addtask", taskcontroller.addtask);
    app.put("/task/:id_task", taskcontroller.update);
    app.delete("/task/:id_task", taskcontroller.delete);
};