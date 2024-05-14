import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { parseColors } from "../util/parseMoods";

const useApi = () => {
  const [success, setSuccess] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    setSuccess("");
    setErr("");
    // eslint-disable-next-line
  }, []);

  const navigate = useNavigate();

  //   Posts API calls
  const fetchPosts = async (mood, setData) => {
    try {
      const res = await axios.get(`/posts${mood}`);
      setData(res.data);
    } catch (err) {
      console.log(err);
      setErr(err.response.data);
    }
  };

  const fetchPostCountByDate = async (date, setCount) => {
    try {
      const res = await axios.get(`/posts/date/${date}`);
      setCount(res.data);
    } catch (err) {
      console.log(err);
      setErr(err.response.data);
    }
  };

  const createPost = async (draft) => {
    const { title, content, moods } = draft;
    try {
      await axios.post(`/posts/`, {
        title,
        content,
        moods,
        created: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      });
      navigate("/");
    } catch (err) {
      console.log(err);
      setErr(err.response.data);
    }
  };

  const editPost = async (postId, draft) => {
    const { title, content, moods } = draft;
    try {
      await axios.put(`/posts/${postId}`, {
        title,
        content,
        moods,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
      setErr(err.response.data);
    }
  };

  const deletePost = async (postId) => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
      setErr(err.response.data);
    }
  };

  const cancelPost = () => {
    navigate("/");
  };

  //   Goals API calls
  const fetchGoal = async (setGoal) => {
    try {
      const res = await axios.get("/user/goal");
      setGoal(res.data.goal);
      return res.data;
    } catch (err) {
      console.log(err);
      setErr(err.response.data);
    }
  };

  const updateGoal = async (newGoal, setGoal) => {
    try {
      const res = await axios.put("/user/goal", { newGoal });
      console.log("updateGoal", res.data);
      setGoal(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
      setErr(err.response.data);
    }
  };

  //   Tags API calls
  const fetchTags = async (setData) => {
    try {
      const res = await axios.get(`/moods`);
      const tags = parseColors(res.data);
      setData(tags);
    } catch (err) {
      console.log(err);
      setErr(err.response.data);
    }
  };

  const addTag = async (tag) => {};

  const deleteTag = async (tag) => {};

  return {
    success,
    err,
    fetchPosts,
    fetchPostCountByDate,
    fetchGoal,
    updateGoal,
    fetchTags,
    createPost,
    editPost,
    deletePost,
    cancelPost,
    addTag,
    deleteTag,
  };
};

export default useApi;
