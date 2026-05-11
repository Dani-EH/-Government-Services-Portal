exports.renderLogin = (req, res) => res.render("auth/login", { title: "Login" });
exports.renderRegister = (req, res) => res.render("auth/register", { title: "Register" });

exports.client = (req, res) => res.render("dashboards/client", { title: "Client" });
exports.employee = (req, res) => res.render("dashboards/employee", { title: "Employee" });
exports.admin = (req, res) => res.render("dashboards/admin", { title: "Admin" });
