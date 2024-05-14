import { colours } from "../context/lists";

export function parseColors(moods) {
  let nextId = 1; // Initialize the counter for id
  if (moods.length > 0) {
    return moods.map((obj) => {
      // Find the corresponding color object based on 'color' value
      const colorObject = colours.find((color) => color.id === obj.color);
      const color = colorObject ? colorObject.code : null; // Replace 'null' with your default value if needed
      const name = obj.name;
      const id = obj.id !== undefined ? obj.id : nextId++;

      // If a matching color object is found, return its 'code', else return null or some default value
      return { id, name, color };
    });
  } else {
    return [];
  }
}
