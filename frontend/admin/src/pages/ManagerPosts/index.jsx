import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "./style.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import CreatePostsModal from "./CreatePostsModal/index.jsx";
import EditPostsModal from "./EditPostsModal/index.jsx";
import { baseUrl } from "../../config/url-config.js";

function ManagerPosts() {
    const [posts, setPosts] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editPostData, setEditPostData] = useState(null);

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

    const handleEditClick = (post) => {
        setEditPostData(post);
        setShowEditForm(true);
    };

    const handleEditClose = () => {
        setShowEditForm(false);
        setEditPostData(null);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa bài viết này không?")) {
            try {
                const response = await axios.delete(
                    `${baseUrl}/posts/delete-posts/${id}`
                );
                if (response.status === 200) {
                    toast.success("Xóa bài viết thành công!");
                    fetchPosts();
                } else {
                    toast.error("Có lỗi xảy ra khi xóa bài viết.");
                }
            } catch (error) {
                console.error("Failed to delete post:", error);
                toast.error("Có lỗi xảy ra khi xóa bài viết.");
            }
        }
    };
    return (
        <div className="wrapper">
            <h3>Quản lý bài viết</h3>
            <div className="add-posts">
                <Button
                    variant="success"
                    onClick={() => setShowCreateForm(true)}
                >
                    Thêm mới
                </Button>
            </div>
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tiêu đề</th>
                        <th>Nội dung</th>
                        <th>Sửa</th>
                        <th>Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => (
                        <tr key={post.id}>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td>
                                {typeof post.content === "string" ? (
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: post.content,
                                        }}
                                    />
                                ) : (
                                    <span>Invalid content format</span>
                                )}
                            </td>
                            <td>
                                <Button onClick={() => handleEditClick(post)}>
                                    Sửa
                                </Button>
                            </td>
                            <td>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDelete(post.id)}
                                >
                                    Xóa
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <ToastContainer />
            <CreatePostsModal
                show={showCreateForm}
                handleClose={() => setShowCreateForm(false)}
                fetchData={fetchPosts}
            />
            <EditPostsModal
                show={showEditForm}
                handleClose={handleEditClose}
                post={editPostData}
                fetchData={fetchPosts}
            />
        </div>
    );
}

export default ManagerPosts;