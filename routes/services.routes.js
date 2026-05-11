const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware");
const adminOnly = require("../middlewares/admin.middleware");
const { validate } = require("../middlewares/validate.middleware");
const servicesController = require("../controllers/services.controller");
const { createServiceValidator, updateServiceValidator, idParamValidator } = require("../validators/services.validator");

router.get("/", servicesController.getAll);

router.post("/", auth, adminOnly, createServiceValidator, validate, servicesController.create);
router.patch("/:id", auth, adminOnly, updateServiceValidator, validate, servicesController.update);
router.delete("/:id", auth, adminOnly, idParamValidator, validate, servicesController.remove);

module.exports = router;
