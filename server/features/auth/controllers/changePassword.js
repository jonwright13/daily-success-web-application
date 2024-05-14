import bcrypt from "bcrypt";
import knexInstance from "../../../utils/knexInstance.js";

const changePassword = async (req, res) => {
  // CHANGE USER PASSWORD
  // Extract necessary fields from the request body
  const { password, passwordConfirm } = req.body;
  const userId = req.userInfo.id;

  if (password.length < 8) return res.status(409).json("Password too short");
  if (password !== passwordConfirm)
    return res.status(409).json("Passwords don't match");

  // Hash the password
  const hash = await bcrypt.hash(password, 10);

  try {
    await knexInstance("users").where("id", userId).update({ password: hash });

    const userData = await knexInstance("users")
      .select("*")
      .where("id", userId)
      .first();

    const { password: userPassword, ...otherData } = userData;
    console.log("Successfully changed password");
    return res.status(200).json(otherData);
  } catch (err) {
    console.log("Error changing name", err);
    throw err;
  }
};

export default changePassword;
