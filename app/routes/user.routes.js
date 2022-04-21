const { authJwt } = require("../middleware");
const board = require("../controllers/user.controller");
const boardAdmin = require("../controllers/admin.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/userBoard", [authJwt.verifyToken],   board.userBoard);
  app.get("/adminBoard",  [authJwt.verifyToken, authJwt.isAdmin],  board.adminBoard);
  app.get("/allBoard", [authJwt.verifyToken, authJwt.isAdmin],  board.allBoard);


};