module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define("projects", {
      id_project: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      id_user: {  type: Sequelize.INTEGER  },
      title: {  type: Sequelize.STRING  },
      date_start: {  type: Sequelize.DATE  },
      date_end: {  type: Sequelize.DATE  },
    }); 
    return Project;
  };

