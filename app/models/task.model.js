module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("tasks", {
        id_task: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_project: {  type: Sequelize.INTEGER  },

        title: {  type: Sequelize.STRING  },
        relevant: {   type: Sequelize.BOOLEAN  },
        date_start: {  type: Sequelize.DATE },
        date_end: {  type: Sequelize.DATE  },
    });
    return Task;
};