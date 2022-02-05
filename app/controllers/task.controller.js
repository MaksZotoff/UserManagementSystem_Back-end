const db = require("../models");

const Task = db.task;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate
    if (!req.body.title) {
        res.status(400).send({
            message: "Содержимое не может быть пустым."
        });
    return;
    }

    const task = {
    id_user: req.body.id_user,
    text: req.body.text,
    status: req.body.status,
    createdAt: req.body.createdAt,
    };

    Task.create(task)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
        message: "Во время создания была получена ошибка."
        });
    });
};

exports.findAll = (req, res) =>{
    const id_task = req.query.id_task;
    var condition = id_task ? {id_task: {[Op.like]: `%${id_task}%`} } : null;
    Task.findAll({  where: condition    })
    .then( task =>{
        res.send(task);
    })
    .catch( err =>{
        res.status(500).send( { message: err.message });
    });
};

exports.findOne = (req, res) => {
    const id_task = req.params.id;
    var condition = id_task ? {id_task: {[Op.eq]: `${id_task}`} } : null;
    Task.findOne({  where: condition    })
    .then( task =>{
        res.send(task);
    })
    .catch( err =>{
        res.status(500).send( { message: err.message });
    });
};

exports.update = (req, res) =>{
    const id_task = req.params.id;
    var condition = id_task ? {id_task: {[Op.eq]: `${id_task}`} } : null;

        Task.update(req.body, {
            where: { condition }
        })
        .then(num => {
            if (num == 1) {
            res.send({
                message: "Task was updated successfully."
            });
            } else {
            res.send({
                message: `Cannot update Task with id=${id}.`
            });
            }
        })
        .catch(err => {
            res.status(500).send({
            message: err.message || "Error updating Task with id=" + id
            });
        });
};

exports.delete = (req, res) =>{
    const id_task = req.params.id;

    Task.destroy({
        where: {   id_task: id_task }
    })

    .then(num => {
        if (num == 1) {
        res.send({
            message: "Task was deleted successfully!"
        });
        } else {
        res.send({
            message: `Cannot delete Task with id=${id_task}.`
        });
        }
    })
    .catch(err => {
        res.status(500).send({
        message: err.message || "Could not delete Task with id=" + id_task
        });
    });
};


/*
exports.update = (req, res) =>{
    const id_task = req.params.id;

        Task.update(req.body, {
            where: { id_task: id_task }
        })
        .then(num => {
            if (num == 1) {
            res.send({
                message: "Task was updated successfully."
            });
            } else {
            res.send({
                message: `Cannot update Task with id=${id}.`
            });
            }
        })
        .catch(err => {
            res.status(500).send({
            message: err.message || "Error updating Task with id=" + id
            });
        });
};
*/