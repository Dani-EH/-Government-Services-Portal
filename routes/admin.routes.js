const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware");
const adminOnly = require("../middlewares/admin.middleware");

router.get("/health", auth, adminOnly, (req, res) => {
  res.json({ ok: true, message: "Admin API running" });
});

module.exports = router;
