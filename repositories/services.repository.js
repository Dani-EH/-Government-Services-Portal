const { Service } = require("../models");

async function getAll() {
  return await Service.findAll();
}

async function findById(id) {
  return await Service.findByPk(id);
}

async function findByName(name) {
  return await Service.findOne({ where: { name } });
}

async function create(data) {
  return await Service.create(data);
}

async function updateById(id, updates) {
  const [affected] = await Service.update(updates, { where: { id } });
  return affected;
}

async function deleteById(id) {
  const affected = await Service.destroy({ where: { id } });
  return affected;
}

module.exports = { getAll, findById, findByName, create, updateById, deleteById };
