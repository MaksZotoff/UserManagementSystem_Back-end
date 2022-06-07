const db = require("../models");
const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;


exports.adduser = (req, res) => {
  User.create({
    email: req.body.email,   
    phone: req.body.phone,
    password: bcrypt.hashSync(req.body.password, 8),
    username: req.body.username,
    name: req.body.name,
    surname: req.body.surname,
    salary: req.body.salary
    
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name_role: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "Пользователь успешно зарегистрирован." });
          });
        });
      } else {
        user.setRoles([1]).then(() => {
          res.send({ message: "Пользователь успешно зарегистрирован." });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username 
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "Пользователь не найден." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Неверный пароль."
        });
      }

      var token = jwt.sign({ id: user.id_user }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name_role.toUpperCase());
        }

        res.status(200).send({
          id: user.id_user,
          username: user.username,
          email: user.email,
          phone: user.phone,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
