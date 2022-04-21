module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define("projects", {
      id_project: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {  type: Sequelize.STRING  },
      id_user: { type: Sequelize.INTEGER},
    }); 
    return Project;
  };

