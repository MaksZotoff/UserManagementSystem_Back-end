module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      id_user: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username : { type: Sequelize.STRING  },
      email : { type: Sequelize.STRING  },
      phone: {  type: Sequelize.STRING  },
      password : { type: Sequelize.STRING }
    });
    return User;
  };


  /*    surname: {  type: Sequelize.STRING  }, 
      name: {  type: Sequelize.STRING  },
      date_birth: {  type: Sequelize.DATE  },
      date_issue: {  type: Sequelize.DATE  },
      series_pass: {  type: Sequelize.STRING  },
*/