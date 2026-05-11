const usersService = require("../services/users.service");

exports.getMe = async (req, res, next) => {
  try { res.json(await usersService.me(req.user.id)); }
  catch (e) { next(e); }
};

exports.list = async (req, res, next) => {
  try { res.json(await usersService.list()); }
  catch (e) { next(e); }
};

exports.updateMe = async (req, res, next) => {
  try { res.json(await usersService.updateMe(req.user.id, req.body)); }
  catch (e) { next(e); }
};

exports.setRole = async (req, res, next) => {
  try { res.json(await usersService.setRole(Number(req.params.id), req.body.role)); }
  catch (e) { next(e); }
};
