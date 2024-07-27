// src/components/Post.js
import React from "react";
import "./style.css";
import { baseUrl } from "../../config/url-config";

const Post = ({ post }) => (
  <section className="post">
    <div>
      {post.image && (
        <img src={baseUrl + "/upload/" + post.image} alt={post.title} />
      )}
      <a href={`/news/${post.id}`}> {post.title}</a>
      <div>
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post?.content }}
        />
      </div>
    </div>
  </section>
);

export default Post;
