module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define(
    "Request",
    {
      status: { type: DataTypes.STRING, allowNull: false, defaultValue: "pending" },
      date_requested: { type: DataTypes.DATEONLY, allowNull: false }
    },
    { tableName: "requests", timestamps: false }
  );
  return Request;
};
