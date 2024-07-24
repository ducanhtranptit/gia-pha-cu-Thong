// src/components/Post.js
import React from "react";
import { formatTime } from "../../utils/formatTime";
import "./style.css";

const Post = ({ post }) => (
  <section className="post">
    <div>
      {post.image && (
        <img
          src={"http://localhost:2504/api/v1/core/upload/" + post.image}
          alt={post.title}
        />
      )}
      <a href={`/news/${post.id}`}> {post.title}</a>
      <div>
        <span className="created-post">
          Thời gian tạo: {formatTime(post.createdAt)}
        </span>
      </div>
    </div>
  </section>
);

export default Post;
