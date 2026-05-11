const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware");
const adminOnly = require("../middlewares/admin.middleware");
const employeeOrAdmin = require("../middlewares/employeeOrAdmin.middleware");
const { validate } = require("../middlewares/validate.middleware");
const requestsController = require("../controllers/requests.controller");
const { createRequestValidator, updateStatusValidator } = require("../validators/requests.validator");

router.post("/", auth, createRequestValidator, validate, requestsController.create);
router.get("/my", auth, requestsController.getMy);

router.get("/", auth, employeeOrAdmin, requestsController.getAll);
router.patch("/:id/status", auth, employeeOrAdmin, updateStatusValidator, validate, requestsController.updateStatus);

module.exports = router;
