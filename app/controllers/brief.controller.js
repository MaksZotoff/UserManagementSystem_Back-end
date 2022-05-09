const db = require("../models");

const Brief = db.brief;
const User = db.user;

const Op = db.Sequelize.Op;

exports.addbrief = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({
            message: "Содержимое не может быть пустым."
        });
        return;
    }

    Brief.create({
        id_brief: req.body.id_brief,
        id_user: User.id_user,
        title: req.body.title,
        status: req.body.relevant ? req.body.relevant : false,
        createdAt: req.body.createdAt,
    })
        .then(brief => {
            res.send({ message: "Задача добавлена успешно." });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

exports.findOne = (req, res) => {
    const id_brief = req.params.id_brief;
    Brief.findByPk(id_brief)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Задачи с идентификатором ${id_brief} не найдено.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Ошибка при получении задачи с идентификатором ${id_brief}`
            });
        });
};

exports.findAll = (req, res) => {
    const id_brief = req.query.id_brief;
    var condition = id_brief ? { id_brief: { [Op.like]: `%${id_brief}%` } } : null;

    Brief.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};


exports.update = (req, res) => {
    const id_brief = req.params.id_brief;

    Brief.update(req.body, {
        where: { id_brief: id_brief }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Задача обновлена успешно."
                });
            } else {
                res.send({
                    message: `Невозможно обновить задачу с идентификатором ${id_brief}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Ошибка обновления проекта.`
            });
        });
};

exports.delete = (req, res) => {
    const id_brief = req.params.id_brief;

    Brief.destroy({
        where: { id_brief: id_brief }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Задача удалена успешно"
                });
            } else {
                res.send({
                    message: `Невозможно удалить задачу с идентификатором ${id_brief}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ошибка удаления задачи"
            });
        });
};
