import bcrypt from "bcrypt";
import knexInstance from "../../../utils/knexInstance.js";
import { getCurrentDateTime, isValidEmail } from "../../../utils/util.js";

const register = async (req, res) => {
  // Parse register details from request
  const { name, email, password, passwordConfirm } = req.body;
  const currentDate = getCurrentDateTime();

  // Checks for password and email validity
  if (!isValidEmail(email)) return res.status(409).json("Enter a valid email");
  if (password.length < 8) return res.status(409).json("Password too short");
  if (password !== passwordConfirm)
    return res.status(409).json("Passwords don't match");

  // Check if user with input credentials already exists
  const existingUser = req.userData;
  if (existingUser) return res.status(409).json("User already exists");

  // Hash the password
  const hash = await bcrypt.hash(password, 10);

  console.log(hash);

  try {
    // Create the user
    await knexInstance("users").insert({
      name,
      email,
      password: hash,
      created: currentDate,
      goal: 3,
    });

    // Respond with success message
    return res.status(200).json("User has been created");
  } catch (err) {
    console.error("Error registering user", err);
    return res.status(500).json("Internal server error");
  }
};

export default register;
