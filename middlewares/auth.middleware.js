const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    const err = new Error("Unauthorized");
    err.status = 401;
    return next(err);
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { id, role }
    next();
  } catch {
    const err = new Error("Invalid token");
    err.status = 401;
    next(err);
  }
};
