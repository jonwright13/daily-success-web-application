import knexInstance from "../../../utils/knexInstance.js";
import { isValidEmail } from "../../../utils/util.js";

const changeEmail = async (req, res) => {
  // CHANGE USER PASSWORD
  // Extract necessary fields from the request body
  const { email } = req.body;
  const userId = req.userInfo.id;

  if (!isValidEmail(email)) return res.status(409).json("Enter a valid email");

  try {
    await knexInstance("users").where("id", userId).update({ email });

    const userData = await knexInstance("users")
      .select("*")
      .where("id", userId)
      .first();

    const { password: userPassword, ...otherData } = userData;
    console.log("Successfully changed email");
    return res.status(200).json(otherData);
  } catch (err) {
    console.log("Error changing name", err);
    throw err;
  }
};

export default changeEmail;
