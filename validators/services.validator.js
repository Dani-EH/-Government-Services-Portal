const { body, param } = require("express-validator");

const createServiceValidator = [
  body("name").notEmpty(),
  body("description").notEmpty(),
];

const updateServiceValidator = [
  param("id").isInt(),
  body("name").optional().notEmpty(),
  body("description").optional().isString(),
];

const idParamValidator = [param("id").isInt()];

module.exports = { createServiceValidator, updateServiceValidator, idParamValidator };
