const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepo = require("../repositories/users.repository");

function safeUser(u) {
  if (!u) return null;
  const obj = u.toJSON ? u.toJSON() : u;
  delete obj.password;
  return obj;
}

async function register(payload) {
  const existsU = await userRepo.findByUsername(payload.username);
  if (existsU) throw Object.assign(new Error("Username already exists"), { status: 400 });

  const existsE = await userRepo.findByEmail(payload.email);
  if (existsE) throw Object.assign(new Error("Email already exists"), { status: 400 });

  const hashed = await bcrypt.hash(payload.password, 12);
  const created = await userRepo.createUser({ ...payload, password: hashed });
  return { message: "Registered", user: safeUser(created) };
}

async function login({ username, password }) {
  const user = await userRepo.findByUsername(username);
  if (!user) throw Object.assign(new Error("Invalid credentials"), { status: 401 });

  // ✅ compare hash to hash (bcrypt compares plain to hashed stored)
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw Object.assign(new Error("Invalid credentials"), { status: 401 });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
  );

  return { token, user: safeUser(user) }; // ✅ Postman friendly
}

module.exports = { register, login };
