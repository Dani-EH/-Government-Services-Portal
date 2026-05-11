module.exports = (req, res, next) => {
  if (req.user?.role !== "admin") {
    const err = new Error("Forbidden (admin only)");
    err.status = 403;
    return next(err);
  }
  next();
};
