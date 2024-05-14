import knexInstance from "../../../utils/knexInstance.js";

const changeName = async (req, res) => {
  // CHANGE USER PASSWORD
  // Extract necessary fields from the request body
  const { name } = req.body;
  const userId = req.userInfo.id;

  try {
    await knexInstance("users").where("id", userId).update({ name });

    const userData = await knexInstance("users")
      .select("*")
      .where("id", userId)
      .first();

    const { password: userPassword, ...otherData } = userData;
    console.log("Successfully changed name");
    return res.status(200).json(otherData);
  } catch (err) {
    console.log("Error changing name", err);
    throw err;
  }
};

export default changeName;
