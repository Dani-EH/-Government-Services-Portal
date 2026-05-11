const { Request, Service, User } = require("../models");

async function create(data) {
  return await Request.create(data);
}

async function getAll() {
  return await Request.findAll({ include: [User, Service] });
}

async function getByUserId(user_id) {
  return await Request.findAll({ where: { user_id }, include: [Service] });
}

async function findById(id) {
  return await Request.findByPk(id);
}

async function updateStatus(id, status) {
  const [affected] = await Request.update({ status }, { where: { id } });
  return affected;
}

module.exports = { create, getAll, getByUserId, findById, updateStatus };
