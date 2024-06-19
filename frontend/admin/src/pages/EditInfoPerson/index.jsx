// EditPersonForm.js
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const EditPersonForm = ({ show, handleClose, person, handleSave }) => {
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [spouse, setSpouse] = useState("");
    const [father, setFather] = useState("");

    useEffect(() => {
        if (person) {
            setName(person.name);
            setGender(person.gender);
            setSpouse(person.spouseId);
            setFather(person.fatherId);
        }
    }, [person]);

    const onSave = () => {
        handleSave({ ...person, name, gender, spouse, father });
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Sửa thông tin người dùng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Họ tên</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Giới tính</Form.Label>
                        <Form.Control
                            as="select"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Vợ/Chồng</Form.Label>
                        <Form.Control
                            type="text"
                            value={spouse}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Bố</Form.Label>
                        <Form.Control
                            type="text"
                            value={father}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={onSave}>
                    Lưu thay đổi
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditPersonForm;
