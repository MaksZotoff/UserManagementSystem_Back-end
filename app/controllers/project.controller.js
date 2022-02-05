const db = require("../models");

const Project = db.project;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate
    if (!req.body.title) {
        res.status(400).send({
            message: "Содержимое не может быть пустым."
        });
    return;
    }

    const project = {
    id_user: req.body.id_user,
    title: req.body.title,
    description: req.body.description,
    date_start: req.body.date_start,
    date_end: req.body.date_end
    };

    Project.create(project)
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
    const id = req.params.id;
    Project.findByPk(id)
    .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send( {
                message: `Проекта с идентификатором ${id} не найдено.`
            })
        }
    })
    .catch(err => {
        res.status(500).send( {
            message: `Ошибка при получении проекта с идентификатором ${id}`
        });
    });
};


exports.update = (req, res) =>{
    const id = req.params.id;

    Project.update(req.body, {
        where: { id: id_user }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: `Проект обновлеен успешно.`
            });
            } else {
            res.send({
                message: `Невозможно обновить проект с идентификатором ${id}.`
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
    const id = req.params.id;

    Project.destroy({
        where: {   id: id }
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
        message: `"Ошибка удаления проекта.`
        });
    });
};

