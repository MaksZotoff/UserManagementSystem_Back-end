const briefcontroller = require("../controllers/brief.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/brief/addbrief", briefcontroller.addbrief);
  app.get("/brief/", briefcontroller.findAll);
  app.get("/brief/:id_brief", briefcontroller.findOne);
  app.put("/brief/:id_brief", briefcontroller.update);
  app.delete("/brief/:id_brief", briefcontroller.delete);
};