import express from "express";
import { getUserByEmail } from "./middleware/getUserData.js";
import authenticateToken from "./middleware/authenticateToken.js";
import { getUserById } from "./middleware/getUserData.js";
import register from "./controllers/register.js";
import login from "./controllers/login.js";
import logout from "./controllers/logout.js";
import changeName from "./controllers/changeName.js";
import changeEmail from "./controllers/changeEmail.js";
import changePassword from "./controllers/changePassword.js";
import confirmPassword from "./controllers/confirmPassword.js";

const router = express.Router();

router.post("/register", getUserByEmail, register);
router.post("/login", getUserByEmail, login);
router.post("/logout", logout);

router.put("/change-name", authenticateToken, changeName);
router.put("/change-email", authenticateToken, changeEmail);
router.put("/change-password", authenticateToken, changePassword);
router.post(
  "/confirm-password",
  authenticateToken,
  getUserById,
  confirmPassword
);

export default router;
