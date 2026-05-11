const { body } = require("express-validator");

const registerValidator = [
  body("role").isIn(["client", "employee", "admin"]).withMessage("invalid role"),
  body("first_name").notEmpty(),
  body("last_name").notEmpty(),
  body("dob").notEmpty(),
  body("pob").notEmpty(),
  body("email").isEmail(),
  body("phone").notEmpty(),
  body("username").isLength({ min: 3 }),
  body("password").isLength({ min: 6 }),
];

const loginValidator = [
  body("username").notEmpty(),
  body("password").notEmpty(),
];

module.exports = { registerValidator, loginValidator };
