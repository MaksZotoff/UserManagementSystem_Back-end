const db = require("../models");

const User = db.user;
const Op = db.Sequelize.Op;


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const Role = db.role;
exports.findRoles = (req, res) => {
  const id_role = req.params.id_role;
  var condition = id_role ? {id_role: {[Op.like]: `%${id_role}%`} } : null;
  Role.findRoles({where: condition})
    .then( data =>{
      res.send(data);
    })
    .catch( err =>{
      res.status(500).send( { message: err.message });
    });
};
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

exports.findAll = (req, res) =>{
    const id_user = req.params.id_user;
    var condition = id_user ? {id_user: {[Op.like]: `%${id_user}%`} } : null;
    User.findAll({  where: condition    })
    .then( data =>{
        res.send(data);
    })
    .catch( err =>{
      res.status(500).send( { message: err.message });
  });
};

exports.findOne = (req, res) => {
  const id_user = req.params.id_user;
  var condition = id_user ? {id_user: {[Op.eq]: `${id_user}`} } : null;

  User.findOne({where: condition})
  .then( data =>{
      res.send(data);
  })
  .catch( err =>{
      res.status(500).send( { message: err.message });
  });
};


exports.findByLogin = (req, res) => {
  const username = req.query.username;
  var condition = username ? {username:  {[Op.eq]:`${username}`} } : null;


    User.findOne({where: condition})
    .then( data =>{
        res.send(data);
    })
    .catch( err =>{
        res.status(500).send( { message: err.message });
    });
};



exports.update = (req, res) =>{
    const id_user = req.params.id_user;

        User.update(req.body, {
            where: { id_user: id_user }
        })
        .then(num => {
            if (num == 1) {
              res.send({
                message: "Данные обновлены успешно."
              });
            } else {
              res.send({
                message: `Невозможно обновить данные пользователя.`
              });
            }
        })
        .catch(err => {
            res.status(500).send({
              message: err.message || "Ошибка обновления данных пользователя."
            });
        });
};


exports.delete = (req, res) =>{
    const id_user = req.params.id_user;
    User.destroy({
        where: {    id_user: id_user  }
    })

    .then(num => {
        if (num == 1) {
          res.send({
            message: "Пользователь удален успешно."
          });
        } else {
          res.send({
            message: `Невозможно удалить пользователя.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Ошибка удаления пользователя."
        });
      });
};
