const { body, param } = require("express-validator");

const updateMeValidator = [
  body("email").optional().isEmail(),
  body("phone").optional().isString(),
  body("first_name").optional().isString(),
  body("last_name").optional().isString(),
  body("username").optional().isString(),
];

const setRoleValidator = [
  param("id").isInt(),
  body("role").isIn(["client", "employee", "admin"]),
];

module.exports = { updateMeValidator, setRoleValidator };
  