const bcrypt = require("bcrypt");
require("dotenv").config();
const { sequelize, User } = require("./models");

const adminPassword = "Admin@12345"; // Password for admin
const adminData = {
  role: "admin",
  first_name: "Admin",
  last_name: "User",
  dob: "1990-01-01",
  pob: "System",
  email: "admin@gsp.com",
  phone: "+961 70 000 000",
  username: "admin",
  password: "" // Will be hashed below
};

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ where: { username: "admin" } });
    if (existingAdmin) {
      console.log("⚠️ Admin user already exists");
      process.exit(0);
    }

    // Hash password
    const hashed = await bcrypt.hash(adminPassword, 12);
    
    // Create admin user
    const admin = await User.create({
      ...adminData,
      password: hashed
    });

    console.log("\n✅ Admin user created successfully!");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("Username: admin");
    console.log("Password: " + adminPassword);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

    process.exit(0);
  } catch (e) {
    console.error("❌ Error:", e.message);
    process.exit(1);
  }
})();
