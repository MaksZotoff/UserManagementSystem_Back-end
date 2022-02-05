const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateLoginOrEmail = (req, res, next) => {
    User.findOne({
      where: {
        username: req.body.username
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Ошибка! Логин уже используется"
        });
        return;
      }
  
      User.findOne({
        where: {
          email: req.body.email
        }
      }).then(user => {
        if (user) {
          res.status(400).send({
            message: "Ошибка! Почта уже используется"
          });
          return;
        }
        next();
      });
    });
  };
  
  checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
      for (let i = 0; i < req.body.roles.length; i++) {
        if (!ROLES.includes(req.body.roles[i])) {
          res.status(400).send({
            message: "Ошибка! Роль не существует = " + req.body.roles[i]
          });
          return;
        }
      }
    }
    next();
  };
  
  const verifySignUp = {
    checkDuplicateLoginOrEmail: checkDuplicateLoginOrEmail,
    checkRolesExisted: checkRolesExisted
  };
  
  module.exports = verifySignUp;
