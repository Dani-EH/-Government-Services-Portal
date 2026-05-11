module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      role: { type: DataTypes.STRING, allowNull: false }, // client | employee | admin
      first_name: { type: DataTypes.STRING, allowNull: false },
      last_name: { type: DataTypes.STRING, allowNull: false },
      dob: { type: DataTypes.DATEONLY, allowNull: false },
      pob: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      phone: { type: DataTypes.STRING, allowNull: false },
      username: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false } // hashed
    },
    { tableName: "users", timestamps: false }
  );
  return User;
};
