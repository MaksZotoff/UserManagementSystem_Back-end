module.exports = function(app) {
    const projectcontroller = require("../controllers/project.controller");

    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    
    app.post("/project/", projectcontroller.create);
    app.get("/project/", projectcontroller.findAll);
    app.get("/project/:id", projectcontroller.findOne);
    app.put("/project/:id", projectcontroller.update);
    app.delete("/project/:id", projectcontroller.delete);
    
  };