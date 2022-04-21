module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("tasks", {
        id_task: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_project: {  type: Sequelize.INTEGER  },

        title: {  type: Sequelize.STRING  },
        status: {   type: Sequelize.STRING  },
        createdAt: {  type: Sequelize.DATE },
        date_end: {  type: Sequelize.DATE  },

    });
    return Task;
};