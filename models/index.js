const Sequelize = require("sequelize");
const sequelize = require("../db/sequelize");

const User = require("./user.model")(sequelize, Sequelize.DataTypes);
const Service = require("./service.model")(sequelize, Sequelize.DataTypes);
const Request = require("./request.model")(sequelize, Sequelize.DataTypes);

// relations
User.hasMany(Request, { foreignKey: "user_id" });
Request.belongsTo(User, { foreignKey: "user_id" });

Service.hasMany(Request, { foreignKey: "service_id" });
Request.belongsTo(Service, { foreignKey: "service_id" });

module.exports = { sequelize, User, Service, Request };
