const { body, param } = require("express-validator");

const createRequestValidator = [
  body("service_id").isInt().withMessage("service_id must be int"),
];

const updateStatusValidator = [
  param("id").isInt(),
  body("status").isIn(["pending", "underway", "done"]),
];

module.exports = { createRequestValidator, updateStatusValidator };
