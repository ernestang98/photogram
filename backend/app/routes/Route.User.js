const router = require("express").Router();
const Auth = require("../middleware/Auth");

const Controller = require('../controllers/LoginController')

// Register User
router.post("/user/register", Controller.RegisterUser);

// Register Admin
router.post("/admin/register", Controller.RegisterAdmin);

// Login
router.post("/login", Controller.Login);

// Delete
router.delete("/delete", Auth, Controller.DeleteUser);

// Check if token is valid
router.post("/validToken", Controller.ValidateToken);

// Get User/Admin Details
router.get("/", Auth, Controller.GetDetails);

module.exports = router;
