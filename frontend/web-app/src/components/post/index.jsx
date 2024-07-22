// src/components/Post.js
import React from "react";
import { formatTime } from "../../utils/formatTime";
import "./style.css";

const Post = ({ post }) => (
  <section className="post">
    <div>
      <a href={`/news/${post.id}`}> {post.title}</a>
      <div>
        <span className="created-post">
          Thời gian tạo: {formatTime(post.createdAt)}
        </span>
        {/* <div
          dangerouslySetInnerHTML={{ __html: post.content }}
          className="content-post"
        ></div> */}
      </div>
    </div>
  </section>
);

export default Post;
