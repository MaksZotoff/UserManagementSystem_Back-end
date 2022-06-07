const Project = require("./project.model");

module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("tasks", {
        id_task: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_project: {  type: Sequelize.INTEGER, default: Project.id_project  },

        title: {  type: Sequelize.STRING  },
        relevant: {   type: Sequelize.BOOLEAN, default: false  },
        date_start: {  type: Sequelize.DATE },
        date_end: {  type: Sequelize.DATE  },
    });
    return Task;
};