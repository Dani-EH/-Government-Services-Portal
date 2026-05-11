const analyticsService = require("../services/analytics.service");

exports.dashboard = async (req, res, next) => {
  try { res.json(await analyticsService.dashboard()); }
  catch (e) { next(e); }
};
