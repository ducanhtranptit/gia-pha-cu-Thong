import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import PostAPI from "../../../api/post";
import "./style.css";
import { baseUrl } from "../../../config/url-config";
import { getCookie } from "../../../utils/cookie";
import { ACCESSTOKEN_KEY } from "../../../config";

function CreatePostsModal({ show, fetchData, handleClose }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const handleSave = async () => {
    try {
      if (!validateForm()) {
        return;
      }
      const postData = {
        title,
        content,
        image: imageUpload,
      };
      const response = await PostAPI.createPost(postData);
      if (response.status === 200) {
        handleClose();
        setTitle("");
        setContent("");
        setImageUpload(null);
        setImage(null);
        fetchData();
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
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setImage(URL.createObjectURL(file));
      handleFileUpload(file);
    },
  });
  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const accessToken = getCookie(ACCESSTOKEN_KEY);

    try {
      const response = await axios.post(baseUrl + "/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setImageUpload(response.data.fileName);
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Có lỗi xảy ra khi upload ảnh. Vui lòng thử lại sau.");
    }
  };
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Thêm bài viết mới</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Label>Ảnh</Form.Label>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {image ? (
              <div className="box-image-post">
                <img src={image} alt="Preview" className="preview-img" />
              </div>
            ) : (
              <Button variant="btn btn-outline-info">Thêm ảnh</Button>
            )}
          </div>
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
