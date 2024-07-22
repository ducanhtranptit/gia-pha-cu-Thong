// src/pages/News.js
import React, { useEffect, useState } from "react";
import posts from "../../data/post.js";
import axios from "axios";
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
    <div className="mx-5 mt-5 w-100">
      <h2 className="mt-5">Tất cả các tin tức</h2>
      <div className="mt-4 list-posts">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default News;
