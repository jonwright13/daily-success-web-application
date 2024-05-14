import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation } from "react-router-dom";
import { parseColors } from "../../../util/parseMoods";
import useApi from "../../../hooks/useApi";
import { useImmerReducer } from "use-immer";
import TagSelect from "../components/TagSelect";
import TagSelectionContainer from "../components/TagSelectionContainer";
import { reducer, ACTIONS } from "../reducer/reducer";

const Write = () => {
  const state = useLocation().state;

  const initialState = {
    title: state?.title || "",
    content: state?.content || "",
    moods: state ? parseColors(state.moods) : [],
  };

  const [draft, setDraft] = useImmerReducer(reducer, initialState);

  const { createPost, editPost, deletePost, cancelPost } = useApi();

  const handleTitleChange = (e) =>
    setDraft({ type: ACTIONS.UPDATE_TITLE, payload: e.target.value });

  const handleContentChange = (value) =>
    setDraft({ type: ACTIONS.UPDATE_CONTENT, payload: value });

  const handleTagChange = (item) =>
    setDraft({ type: ACTIONS.UPDATE_TAGS, payload: item });

  // Pass in a mood object to remove it from the array
  const handleRemoveMood = (item) =>
    setDraft({ type: ACTIONS.REMOVE_TAG, payload: item });

  const handleSubmit = async (e) => {
    e.preventDefault();
    state ? editPost(state.id, draft) : createPost(draft);
  };

  const handleDeleteCancel = async () => {
    if (state) {
      await deletePost(state.id);
    } else {
      cancelPost();
    }
  };

  return (
    <div className="add">
      <h1>What are you proud of today?</h1>
      <div className="write-container">
        <div className="content">
          <input
            name="title"
            type="text"
            placeholder="Title"
            value={draft.title}
            onChange={handleTitleChange}
          />
          <div className="editorContainer">
            <ReactQuill
              theme="snow"
              className="editor"
              value={draft.content}
              onChange={handleContentChange}
            ></ReactQuill>
          </div>
        </div>
        <div className="menu">
          <div className="item">
            <div className="item-header">
              <h1>Mood</h1>
              <TagSelect tags={draft.moods} onChange={handleTagChange} />
            </div>
            <TagSelectionContainer
              tags={draft.moods}
              onRemove={handleRemoveMood}
            />
            <div className="buttons">
              <button onClick={handleSubmit}>Publish</button>
              <button onClick={handleDeleteCancel}>
                {state ? "Delete" : "Cancel"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
