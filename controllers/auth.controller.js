const authService = require("../services/auth.service");

exports.register = async (req, res, next) => {
  try { res.status(201).json(await authService.register(req.body)); }
  catch (e) { next(e); }
};

exports.login = async (req, res, next) => {
  try { res.json(await authService.login(req.body)); }
  catch (e) { next(e); }
};
