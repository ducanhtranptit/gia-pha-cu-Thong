// src/components/Post.js
import React from "react";

const Post = ({ post }) => (
	<div className="post">
		<h2>{post.title}</h2>
		<p>{post.content}</p>
		<small>{post.date}</small>
	</div>
);

export default Post;
