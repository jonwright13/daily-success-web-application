import bcrypt from "bcrypt";

const confirmPassword = async (req, res) => {
  const { password } = req.body;

  //   // Check if user exists
  const userData = req.userData;
  if (!userData) return res.status(404).json("User not found");

  // Check if password matches
  const isPasswordCorrect = bcrypt.compareSync(password, userData.password);
  if (!isPasswordCorrect) return res.status(400).json("Wrong credentials!");

  return res.status(200).json(true);
};

export default confirmPassword;
