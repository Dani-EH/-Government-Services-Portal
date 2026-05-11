const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware");
const adminOnly = require("../middlewares/admin.middleware");
const analyticsController = require("../controllers/analytics.controller");

router.get("/dashboard", auth, adminOnly, analyticsController.dashboard);

module.exports = router;
