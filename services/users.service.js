const userRepo = require("../repositories/users.repository");

async function me(userId) {
  const user = await userRepo.findByIdSafe(userId);
  if (!user) throw Object.assign(new Error("User not found"), { status: 404 });
  return user;
}

async function list() {
  return await userRepo.getAllSafe();
}

async function updateMe(userId, updates) {
  const allowed = ["email", "phone", "first_name", "last_name", "username"];
  const clean = {};
  for (const k of allowed) if (updates[k] !== undefined) clean[k] = updates[k];

  const affected = await userRepo.updateById(userId, clean);
  if (!affected) throw Object.assign(new Error("Update failed"), { status: 500 });

  return { message: "Profile updated" };
}

async function setRole(id, role) {
  if (!["client", "employee", "admin"].includes(role)) {
    throw Object.assign(new Error("Invalid role"), { status: 400 });
  }
  const affected = await userRepo.updateRoleById(id, role);
  if (!affected) throw Object.assign(new Error("Role update failed"), { status: 500 });
  return { message: "Role updated" };
}

module.exports = { me, list, updateMe, setRole };
