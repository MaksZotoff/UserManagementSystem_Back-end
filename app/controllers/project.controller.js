const db = require("../models");

const Project = db.project;
const Op = db.Sequelize.Op;

exports.addproject = (req, res) => {
    // Validate
    if (!req.body.title) {
        res.status(400).send({
            message: "Содержимое не может быть пустым."
        });
    return;
    }

    Project.create({
    id_project: req.body.id_project,
    title: req.body.title,
    id_user: req.body.id_user,
    })
    .then(project => {
        res.send(project);
    })
    .catch(err => {
        res.status(500).send({
        message: err.message
        });
    });
};

exports.findAll = (req, res) =>{
    const title = req.query.title;
    var condition = title ? {title: {[Op.like]: `%${title}%`} } : null;
    
    Project.findAll({  where: condition    })
    .then( data =>{
        res.send(data);
    })
    .catch( err =>{
        res.status(500).send( { message: err.message });
    });
};

exports.findOne = (req, res) => {
    const id_project = req.params.id_project;
    Project.findByPk(id_project)
    .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send( {
                message: `Проекта с идентификатором ${id_project} не найдено.`
            })
        }
    })
    .catch(err => {
        res.status(500).send( {
            message: `Ошибка при получении проекта с идентификатором ${id_project}`
        });
    });
};


exports.update = (req, res) =>{
    const id_project = req.params.id_project;

    Project.update(req.body, {
        where: { id_project: id_project }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: `Проект обновлен успешно.`
            });
            } else {
            res.send({
                message: `Невозможно обновить проект с идентификатором ${id_project}.`
            });
            }
        })
        .catch(err => {
            res.status(500).send({
                message:  `Ошибка обновления проекта.`
            });
        });
};

exports.delete = (req, res) =>{
    const id_project = req.params.id_project;

    Project.destroy({
        where: {   id_project: id_project }
    })

    .then(num => {
        if (num == 1) {
        res.send({
            message: "Проект удален успешно."
        });
        } else {
        res.send({
            message: `Невозможно удалить проект с идентификатором  ${id_project}.`
        });
        }
    })
    .catch(err => {
        res.status(500).send({
        message: `Ошибка удаления проекта.`
        });
    });
};

