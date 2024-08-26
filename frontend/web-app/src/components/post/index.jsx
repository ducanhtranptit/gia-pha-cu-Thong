import React from "react";
import "./style.css";
import { baseUrl } from "../../config/url-config";
import { useNavigate } from "react-router-dom";

const Post = ({ post }) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/news/${post.id}`);
	};

	return (
		<section className="post" onClick={handleClick}>
			<div>
				{post.image && <img src={baseUrl + "/upload/" + post.image} alt={post.title} />}
				<a href={`/news/${post.id}`} onClick={(e) => e.preventDefault()}>
					{post.title}
				</a>
				<div>
					<div className="post-content" dangerouslySetInnerHTML={{ __html: post?.content }} />
				</div>
			</div>
		</section>
	);
};

export default Post;
