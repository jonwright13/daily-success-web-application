import React, { useEffect, useState } from "react";
import useApi from "../../../hooks/useApi";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import moment from "moment";

const Goal = () => {
  const [goal, setGoal] = useState(0);
  const [newGoal, setNewGoal] = useState(goal);
  const [count, setCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const { fetchGoal, fetchPostCountByDate, updateGoal } = useApi();
  const date = moment(Date.now()).format("YYYY-MM-DD");

  useEffect(() => {
    fetchGoal(setGoal);
    fetchPostCountByDate(date, setCount);
  }, []);

  useEffect(() => {
    if (count <= goal) {
      setProgress((count / goal) * 100);
    } else {
      setProgress(100);
    }
  }, [count, goal]);

  useEffect(() => {
    setNewGoal(goal);
  }, [goal]);

  const handleNewGoal = (e) => {
    const newGoalFormat = Math.max(e.target.value, 0);
    setNewGoal(newGoalFormat);
  };

  const handleUpdateGoal = () => {
    updateGoal(newGoal, setGoal);
  };

  return (
    <div>
      Goal: {count}/{goal}
      <Box sx={{ width: "100%" }}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
      <input type="number" value={newGoal} onChange={handleNewGoal}></input>
      <button onClick={handleUpdateGoal}>Change Goal</button>
    </div>
  );
};

export default Goal;
