import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { baseUrl } from "../../../config/url-config";

function CreatePostsModal({ show, fetchData, handleClose }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const handleSave = async () => {
    try {
      if (!validateForm()) {
        return;
      }
      const postData = {
        title,
        content,
      };
      const response = await axios.post(`${baseUrl}/posts/create-posts`, {
        posts: postData,
      });
      if (response.status === 200) {
        handleClose();
        setTitle("");
        setContent("");
        toast.success("Thêm thành công bài viết!");
      }
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };
  const validateForm = () => {
    if (!title) {
      toast.error("Vui lòng nhập tiêu đề bài viết");
      return false;
    }

    if (!content) {
      toast.error("Vui lòng nhập nội dung bài viết");
      return false;
    }

    return true;
  };
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Thêm bài viết mới</Modal.Title>
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
          Thêm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreatePostsModal;
