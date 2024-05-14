import React, { useEffect, useState } from "react";
import useApi from "../../../hooks/useApi";

/*
► List of all moods
► Each row is it's own card that contains name, color, delete button
► Clicking on the color icon brings up a palette to change color
► Clicking on name changes it to a textfield to make changes
► Push to db on any changes
► Bottom of list contains a + icon to add a new row
*/

const Moods = () => {
  const [moods, setMood] = useState([]);
  const { fetchTags } = useApi();

  useEffect(() => {
    fetchTags(setMood);
  }, []);

  const handleUpdate = () => {};

  return (
    <div>
      {moods && moods.map((mood) => <div key={mood.index}>{mood.name}</div>)}
    </div>
  );
};

export default Moods;
