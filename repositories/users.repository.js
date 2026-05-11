const { User } = require("../models");

async function findByUsername(username) {
  return await User.findOne({ where: { username } });
}

async function findByEmail(email) {
  return await User.findOne({ where: { email } });
}

async function createUser(data) {
  return await User.create(data);
}

async function findByIdSafe(id) {
  return await User.findByPk(id, { attributes: { exclude: ["password"] } });
}

async function getAllSafe() {
  return await User.findAll({ attributes: { exclude: ["password"] } });
}

async function updateById(id, updates) {
  const [affected] = await User.update(updates, { where: { id } });
  return affected;
}

async function updateRoleById(id, role) {
  const [affected] = await User.update({ role }, { where: { id } });
  return affected;
}

module.exports = {
  findByUsername,
  findByEmail,
  createUser,
  findByIdSafe,
  getAllSafe,
  updateById,
  updateRoleById,
};
