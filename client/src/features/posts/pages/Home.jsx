import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../authentication/hooks/useAuth";
import useApi from "../../../hooks/useApi";
import Posts from "../components/Posts";

const Home = () => {
  const { isAuthenticated } = useAuth();
  const { fetchPosts } = useApi();
  const [posts, setPosts] = useState([]);

  // Get mood from the web address
  const mood = useLocation().search;

  useEffect(() => {
    if (isAuthenticated) fetchPosts(mood, setPosts);
  }, [mood]);

  return (
    <div className="home">
      {isAuthenticated ? (
        <Posts posts={posts} />
      ) : (
        <div>
          <h1>Home Page Signed Out</h1>
        </div>
      )}
    </div>
  );
};

export default Home;
