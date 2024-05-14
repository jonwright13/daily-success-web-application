export const ACTIONS = {
  UPDATE_TITLE: "update_title",
  UPDATE_CONTENT: "update_content",
  UPDATE_TAGS: "update_tags",
  REMOVE_TAG: "remove_tag",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "update_title":
      state.title = action.payload;
      break;
    case "update_content":
      state.content = action.payload;
      break;
    case "update_tags":
      const maxId = state.moods.reduce((highest, current) => {
        return current.id > highest ? current.id : highest;
      }, 0);

      state.moods.push({
        id: maxId + 1,
        name: action.payload.name,
        color: action.payload.color,
      });

      break;
    case "remove_tag":
      state.moods = state.moods.filter((obj) => obj.id !== action.payload.id);
      break;
    default:
      break;
  }
};
