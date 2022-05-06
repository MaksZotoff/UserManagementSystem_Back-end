const db = require("../models");

const Task = db.task;
const Op = db.Sequelize.Op;

exports.addtask = (req, res) => {

    if (!req.body.title) {
        res.status(400).send({
            message: "Содержимое не может быть пустым."
        });
        return;
    }

    Task.create({
        id_task: req.body.id_task,
        id_project: req.body.id_project,
        title: req.body.title,
        relevant: req.body.relevant ? req.body.relevant : false,
        date_start: req.body.date_start,
        date_end: req.body.date_end,
    })
        .then(task => {
            res.send({ message: "Задача добавлена успешно." });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

exports.findOne = (req, res) => {
    const id_task = req.params.id_task;
    Task.findByPk(id_task)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Зададчи с идентификатором ${id_task} не найдено.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Ошибка при получении задачи с идентификатором ${id_task}`
            });
        });
};

exports.findAll = (req, res) => {
    const id_task = req.query.id_task;
    var condition = id_task ? { id_task: { [Op.like]: `%${id_task}%` } } : null;

    Task.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.findAllRelevant = (req, res) => {
    Task.findAll({ where: { relevant: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: `Ошибка при получении задачи с идентификатором ${id_task}`
            });
        });
};

exports.update = (req, res) => {
    const id_task = req.params.id_task;

    Task.update(req.body, {
        where: { id_task: id_task }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Задача обновлена успешно."
                });
            } else {
                res.send({
                    message: `Невозможно обновить задачу с идентификатором ${id_task}.`
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
    const id_task = req.params.id_task;

    Task.destroy({
        where: { id_task: id_task }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Задача удалена успешно"
                });
            } else {
                res.send({
                    message: `Невозможно удалить задачу с идентификатором ${id_task}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ошибка удаления задачи"
            });
        });
};
