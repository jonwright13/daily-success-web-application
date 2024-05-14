import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { parseColors } from "../../../util/parseMoods";

const MoodButton = ({ item }) => {
  return (
    <Link
      className="link mood-container"
      to={`/?mood=${item.name}`}
      style={{ background: item.color }}
    >
      {item.name}
    </Link>
  );
};

const Card = ({ post }) => {
  const Header = () => {
    return (
      <>
        <h1>{post.title}</h1>
        <p>
          <strong>Created:</strong> {moment(post.created).fromNow()}
        </p>
      </>
    );
  };

  const Content = () => {
    // Parse text to html
    const doc = new DOMParser().parseFromString(post.content, "text/html");
    return <p>{doc.body.textContent}</p>;
  };

  const MoodsArray = () => {
    const Moods = post.moods
      ? parseColors(post.moods).map((item, index) => (
          <MoodButton key={index} item={item} />
        ))
      : null;

    return (
      <div className="details-container">
        <div className="container-1">
          <p>
            <strong>Mood:</strong>{" "}
          </p>
          <div className="moods">{Moods}</div>
        </div>
      </div>
    );
  };

  const ButtonContainer = () => {
    return (
      <div className="buttons-container">
        <Link className="link" to={`/write?edit=${post.id}`} state={post}>
          <button>Edit</button>
        </Link>
      </div>
    );
  };

  return (
    <div className="post">
      <div className="content">
        <Header />
        <Content />
        <MoodsArray />
        <ButtonContainer />
      </div>
    </div>
  );
};

const Posts = ({ posts }) => {
  return (
    <div className="posts">
      {posts ? posts.map((post) => <Card key={post.id} post={post} />) : null}
    </div>
  );
};

export default Posts;
