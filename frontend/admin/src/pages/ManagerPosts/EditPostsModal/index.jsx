import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../../config/url-config";

function EditPostsModal({ show, handleClose, post, fetchData }) {
    const [title, setTitle] = useState(post ? post.title : "");
    const [content, setContent] = useState(post ? post.content : "");

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setContent(post.content);
        }
    }, [post]);

    const handleSave = async () => {
        try {
            const postData = {
                id: post.id,
                title,
                content,
            };
            const response = await axios.put(
                `${baseUrl}/posts/update-posts/${post.id}`,
                postData
            );
            if (response.status === 200) {
                fetchData();
                handleClose();
                toast.success("Chỉnh sửa bài viết thành công!");
            }
        } catch (error) {
            console.error("Failed to edit post:", error);
            toast.error("Có lỗi xảy ra khi chỉnh sửa bài viết.");
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Chỉnh sửa bài viết</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formTitle">
                        <Form.Label>Tiêu đề</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập tiêu đề"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="full-width">
                        <Form.Label>Nội dung</Form.Label>
                        <ReactQuill
                            value={content}
                            onChange={setContent}
                            placeholder="Nhập mô tả"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Lưu thay đổi
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditPostsModal;
