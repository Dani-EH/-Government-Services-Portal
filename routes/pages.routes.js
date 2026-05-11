const express = require("express");
const router = express.Router();

// Render EJS templates
router.get("/", (req, res) => {
  res.render("login");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("signup");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/client", (req, res) => {
  res.render("client");
});

router.get("/services", (req, res) => {
  res.render("services");
});

router.get("/personal", (req, res) => {
  res.render("personal");
});

router.get("/employee", (req, res) => {
  res.render("employee");
});

router.get("/admin", (req, res) => {
  res.render("admin");
});

module.exports = router;