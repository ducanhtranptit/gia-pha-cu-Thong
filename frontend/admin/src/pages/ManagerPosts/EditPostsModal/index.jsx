import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../../config/url-config";
import { useDropzone } from "react-dropzone";

function EditPostsModal({ show, handleClose, post, fetchData }) {
  const [title, setTitle] = useState(post ? post.title : "");
  const [content, setContent] = useState(post ? post.content : "");
  const [image, setImage] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      if (post.image) {
        setImage("http://localhost:2504/api/v1/core/upload/" + post.image);
        setImageUpload(post.image);
      }
    }
  }, [post]);

  const handleSave = async () => {
    try {
      const postData = {
        id: post.id,
        title: title.trim(),
        content: content.trim(),
        image: imageUpload,
      };
      console.log(postData);
      if (postData.title.length > 200) {
        toast.error("Tiêu đề tối đa 200 ký tự");
        return;
      }
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

    try {
      const response = await axios.post(
        "http://localhost:2504/api/v1/core/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setImageUpload(response.data.fileName);
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Có lỗi xảy ra khi upload ảnh. Vui lòng thử lại sau.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa bài viết</Modal.Title>
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
          Lưu thay đổi
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditPostsModal;
