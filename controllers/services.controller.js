const servicesService = require("../services/services.service");

exports.getAll = async (req, res, next) => {
  try { res.json(await servicesService.listServices()); }
  catch (e) { next(e); }
};

exports.create = async (req, res, next) => {
  try { res.status(201).json(await servicesService.addService(req.body)); }
  catch (e) { next(e); }
};

exports.update = async (req, res, next) => {
  try { res.json(await servicesService.updateService(Number(req.params.id), req.body)); }
  catch (e) { next(e); }
};

exports.remove = async (req, res, next) => {
  try { res.json(await servicesService.removeService(Number(req.params.id))); }
  catch (e) { next(e); }
};
