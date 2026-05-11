const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const err = new Error(errors.array()[0].msg);
  err.status = 400;
  next(err);
};

module.exports = { validate };
