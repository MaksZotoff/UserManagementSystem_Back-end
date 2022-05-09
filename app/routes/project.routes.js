const projectcontroller = require("../controllers/project.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    
    app.post("/project/addproject", projectcontroller.addproject);
    app.get("/project/", projectcontroller.findAll);
    app.get("/project/:id_project", projectcontroller.findOne);
    app.put("/project/:id_project", projectcontroller.update);
    app.delete("/project/:id_project", projectcontroller.delete);  

};

