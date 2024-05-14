// src/pages/News.js
import React from "react";
import posts from "../../data/post.js";
import Post from "../../components/post/index.jsx";
import "./style.css"

const News = () => (
	<div className="mt-5">
		<h1 className="mt-5">Tất cả các bài đăng</h1>
		{posts.map((post) => (
			<Post key={post.id} post={post} />
		))}
	</div>
);

export default News;
