module.exports = function(app) {
  
  const admincontroller = require("../controllers/admin.controller");
  const authcontroller = require("../controllers/auth.controller")
  const { verifySignUp } = require("../middleware");

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

    app.post(
      "/user/adduser", 
      [verifySignUp.checkDuplicateLoginOrEmail, 
      verifySignUp.checkRolesExisted 
      ], 
      authcontroller.adduser
    );

    app.get("/user/", admincontroller.findAll);
    app.get("/user/:id_user", admincontroller.findOne);

    app.get(`/user?username=`, admincontroller.findByLogin); 
    app.put("/user/:id_user", admincontroller.update);
    app.delete("/user/:id_user", admincontroller.delete);
  
};
