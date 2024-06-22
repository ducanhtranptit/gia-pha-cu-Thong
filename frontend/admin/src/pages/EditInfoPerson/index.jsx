import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import config from "../../config/url-config.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditPersonForm = ({ show, handleClose, person, handleSave }) => {
    const baseUrl = config.baseUrl;
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (person) {
            setName(person.name);
            setDescription(person.description);
        }
    }, [person]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const updatedPerson = {
            name: name,
            description: description,
        };
        try {
            const response = await axios.put(
                `${baseUrl}/people/update-person/${person.id}`,
                updatedPerson
            );
            handleClose();
            toast.success("Thông tin thành viên đã được cập nhật thành công!");
        } catch (error) {
            console.error("Error updating person:", error);
            toast.error("Đã xảy ra lỗi khi cập nhật thông tin thành viên.");
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Chỉnh sửa thông tin thành viên</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Họ tên</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Mô tả</Form.Label>
                        <Form.Control
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Đóng
                        </Button>
                        <Button variant="primary" type="submit">
                            Lưu thay đổi
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditPersonForm;
