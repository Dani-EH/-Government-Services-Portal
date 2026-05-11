const requestsService = require("../services/requests.service");

exports.create = async (req, res, next) => {
  try {
    res.status(201).json(await requestsService.createRequest(req.user.id, req.body.service_id));
  } catch (e) { next(e); }
};

exports.getMy = async (req, res, next) => {
  try { res.json(await requestsService.myRequests(req.user.id)); }
  catch (e) { next(e); }
};

exports.getAll = async (req, res, next) => {
  try { res.json(await requestsService.allRequests()); }
  catch (e) { next(e); }
};

exports.updateStatus = async (req, res, next) => {
  try { res.json(await requestsService.setStatus(Number(req.params.id), req.body.status)); }
  catch (e) { next(e); }
};
