import knexInstance from "../../utils/knexInstance.js";

export const fetchGoal = async (req, res) => {
  const userId = req.userInfo.id;
  try {
    const goal = await knexInstance("users")
      .select("goal")
      .where("id", userId)
      .first();

    console.log("Fetched user's goal", goal);
    return res.status(200).json(goal);
  } catch (err) {
    console.log("Error fetching goal", err);
    return res.status(500).json("Error fetching goal");
  }
};

export const updateGoal = async (req, res) => {
  const userId = req.userInfo.id;
  const { newGoal } = req.body;

  try {
    await knexInstance("users").where("id", userId).update({ goal: newGoal });
    console.log("Successfully updated goal");
    return res.status(200).json(newGoal);
  } catch (err) {
    console.log("Error updating goal", err);
    return res.status(500).json("Error updating goal");
  }
};
