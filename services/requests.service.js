const requestRepo = require("../repositories/requests.repository");

function today() {
  return new Date().toISOString().split("T")[0];
}

async function createRequest(userId, service_id) {
  const created = await requestRepo.create({
    user_id: userId,
    service_id,
    status: "pending",
    date_requested: today(),
  });
  return { message: "Request created", id: created.id };
}

async function myRequests(userId) {
  return await requestRepo.getByUserId(userId);
}

async function allRequests() {
  return await requestRepo.getAll();
}

async function setStatus(id, status) {
  if (!["pending", "underway", "done"].includes(status)) {
    throw Object.assign(new Error("Invalid status"), { status: 400 });
  }
  const affected = await requestRepo.updateStatus(id, status);
  if (!affected) throw Object.assign(new Error("Request not found"), { status: 404 });
  return { message: "Status updated" };
}

module.exports = { createRequest, myRequests, allRequests, setStatus };
