const config = require("../config/db.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    },
    define: { timestamps: false }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model")(sequelize, Sequelize);
db.role = require("./role.model")(sequelize, Sequelize);
db.task = require("./task.model")(sequelize, Sequelize);
db.project = require("./project.model")(sequelize, Sequelize);

// M:M(N:M) -> BelongsToMany Association 
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
  define: {
    timestamps: false
  }
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
  define: {
    timestamps: false
  }
});




db.user.hasMany(db.project, {
  foreignKey: "id_user",
})
db.project.belongsTo(db.user , {
  foreignKey: "id_user",
})



db.project.hasMany(db.task, {
  foreignKey: "id_project",
})
db.task.belongsTo(db.project, {
  foreignKey: "id_project",
})


db.ROLES = [ "admin", "user"];

module.exports = db; 