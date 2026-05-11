module.exports = (req, res, next) => {
  if (req.user?.role !== "admin" && req.user?.role !== "employee") {
    const err = new Error("Forbidden (employee or admin only)");
    err.status = 403;
    return next(err);
  }
  next();
};
