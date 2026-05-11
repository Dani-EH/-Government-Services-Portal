module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define(
    "Service",
    {
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
      description: { type: DataTypes.TEXT, allowNull: false }
    },
    { tableName: "services", timestamps: false }
  );
  return Service;
};
