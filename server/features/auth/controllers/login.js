import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  const { password } = req.body;

  // Check if user exists
  const userData = req.userData;
  if (!userData) return res.status(404).json("User not found");

  // Check if password matches
  const isPasswordCorrect = bcrypt.compareSync(password, userData.password);
  if (!isPasswordCorrect) return res.status(400).json("Wrong credentials!");

  // Create a jwt token, signed with the secure key
  const token = jwt.sign({ id: userData.id }, "jwtkey"); // Store JWT secret securely -> Move to ENV
  const { password: userPassword, ...otherData } = userData;

  return res
    .cookie("access_token", token, {
      httpOnly: true,
    })
    .status(200)
    .json(otherData);
};

export default login;
