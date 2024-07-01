// src/pages/News.js
import React, { useEffect, useState } from "react";
import posts from "../../data/post.js";
import axios from "axios";
import { Link } from "react-router-dom";
import Post from "../../components/post/index.jsx";
import { toast, ToastContainer } from "react-toastify";
import "./style.css";
import { baseUrl } from "../../config/url-config.js";

function News() {
    const [posts, setPosts] = useState([]);
    const fetchPosts = async () => {
        try {
            const response = await axios.get(`${baseUrl}/posts/posts-list`);
            if (response.status === 200) {
                setPosts(response.data.data);
            } else {
                toast.error("Có lỗi xảy ra khi lấy dữ liệu bài viết.");
            }
        } catch (error) {
            console.error("Failed to fetch posts:", error);
            toast.error("Có lỗi xảy ra khi lấy dữ liệu bài viết.");
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="mt-5">
            <h1 className="mt-5">Tất cả các bài đăng</h1>
            {posts.map((post) => (
                <Link to={`/posts-detail/${post.title}`} className="posts">
                    <Post key={post.id} post={post} />
                </Link>
            ))}
        </div>
    );
}

export default News;
