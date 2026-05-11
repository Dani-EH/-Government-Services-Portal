const { User, Service, Request } = require("../models");
const { Sequelize } = require("sequelize");

async function totals() {
  const [users, services, requests] = await Promise.all([
    User.count(),
    Service.count(),
    Request.count(),
  ]);
  return { users, services, requests };
}

async function requestsByStatus() {
  return await Request.findAll({
    attributes: ["status", [Sequelize.fn("COUNT", Sequelize.col("status")), "total"]],
    group: ["status"],
  });
}

async function topServices(limit = 5) {
  return await Request.findAll({
    attributes: ["service_id", [Sequelize.fn("COUNT", Sequelize.col("service_id")), "total"]],
    group: ["service_id"],
    order: [[Sequelize.literal("total"), "DESC"]],
    limit,
  });
}

module.exports = { totals, requestsByStatus, topServices };
