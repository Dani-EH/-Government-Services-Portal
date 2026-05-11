module.exports = (err, req, res, next) => {
  const status = err.status || 500;

  const wantsJson =
    req.originalUrl.startsWith("/api") ||
    req.headers.accept?.includes("application/json");

  if (wantsJson) {
    return res.status(status).json({ message: err.message || "Server error" });
  }

  return res.status(status).render("shared/error", {
    title: "Error",
    status,
    message: err.message || "Server error",
  });
};
