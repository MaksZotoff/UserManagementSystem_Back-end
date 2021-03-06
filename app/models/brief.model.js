const User = require("./user.model");

module.exports = (sequelize, Sequelize) => {
    const Brief = sequelize.define("briefs", {
        id_brief: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_user: {  type: Sequelize.INTEGER,  default: User.id_user  },

        title: {  type: Sequelize.STRING  },
        status: {   type: Sequelize.STRING  },
        createdAt: {  
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW 
        },
    });
    return Brief;
};