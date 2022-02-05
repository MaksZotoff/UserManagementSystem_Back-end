module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("tasks", {
        id_task: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_user: {  type: Sequelize.INTEGER  },
        text: {  type: Sequelize.STRING  },
        status: {   type: Sequelize.STRING  },
        createdAt: {    
            type: Sequelize.DATE, 
            defaultValue: Sequelize.NOW   
        },
    });
    return Task;
};