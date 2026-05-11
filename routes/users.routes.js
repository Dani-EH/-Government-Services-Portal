const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware");
const adminOnly = require("../middlewares/admin.middleware");
const { validate } = require("../middlewares/validate.middleware");
const usersController = require("../controllers/users.controller");
const { updateMeValidator, setRoleValidator } = require("../validators/users.validator");

router.get("/me", auth, usersController.getMe);
router.patch("/me", auth, updateMeValidator, validate, usersController.updateMe);

router.get("/", auth, adminOnly, usersController.list);
router.patch("/:id/role", auth, adminOnly, setRoleValidator, validate, usersController.setRole);

module.exports = router;
