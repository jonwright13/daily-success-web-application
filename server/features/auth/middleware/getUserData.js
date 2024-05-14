import knexInstance from "../../../utils/knexInstance.js";

export const getUserByEmail = async (req, res, next) => {
  const { email } = req.body;
  try {
    // Check if user already exists
    const userData = await knexInstance("users")
      .select("*")
      .where("email", email);

    req.userData = userData[0];
    next();
  } catch (err) {
    console.log("Error fetching user data", err);
    return res.status(500).json("Erro fetching user");
  }
};

export const getUserById = async (req, res, next) => {
  const userId = req.userInfo.id;
  try {
    // Check if user already exists
    const userData = await knexInstance("users")
      .select("*")
      .where("id", userId);

    req.userData = userData[0];
    next();
  } catch (err) {
    console.log("Error fetching user data", err);
    return res.status(500).json("Erro fetching user");
  }
};
