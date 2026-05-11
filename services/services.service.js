const serviceRepo = require("../repositories/services.repository");

async function listServices() {
  return await serviceRepo.getAll();
}

async function addService(data) {
  const dup = await serviceRepo.findByName(data.name);
  if (dup) throw Object.assign(new Error("Service already exists"), { status: 400 });

  const created = await serviceRepo.create(data);
  return { message: "Service created", id: created.id };
}

async function updateService(id, updates) {
  const existing = await serviceRepo.findById(id);
  if (!existing) throw Object.assign(new Error("Service not found"), { status: 404 });

  const affected = await serviceRepo.updateById(id, updates);
  if (!affected) throw Object.assign(new Error("Update failed"), { status: 500 });

  return { message: "Service updated" };
}

async function removeService(id) {
  const existing = await serviceRepo.findById(id);
  if (!existing) throw Object.assign(new Error("Service not found"), { status: 404 });

  const affected = await serviceRepo.deleteById(id);
  if (!affected) throw Object.assign(new Error("Delete failed"), { status: 500 });

  return { message: "Service deleted" };
}

module.exports = { listServices, addService, updateService, removeService };
