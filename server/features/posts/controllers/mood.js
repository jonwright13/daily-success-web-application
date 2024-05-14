import knexInstance from "../../../utils/knexInstance.js";

// GET ALL MOODS FROM USER
export const getMoods = async (req, res) => {
  const userId = req.userInfo.id;

  try {
    const moods = await knexInstance("moods")
      .select("id", "name", "color")
      .where("uid", userId);
    console.log("Returned all user's moods");
    return res.status(200).json(moods);
  } catch (err) {
    console.log("Connection error", err);
    return res.status(500).json(err);
  }
};
