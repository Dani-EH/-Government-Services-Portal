const analyticsRepo = require("../repositories/analytics.repository");

async function dashboard() {
  const [totals, byStatus, top] = await Promise.all([
    analyticsRepo.totals(),
    analyticsRepo.requestsByStatus(),
    analyticsRepo.topServices(5),
  ]);

  return { totals, requestsByStatus: byStatus, topServices: top };
}

module.exports = { dashboard };
