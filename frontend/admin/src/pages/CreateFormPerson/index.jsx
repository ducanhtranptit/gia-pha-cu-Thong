import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import config from "../../config/url-config.js";
import { toast } from "react-toastify";
import "./style.css";
import "react-toastify/dist/ReactToastify.css";

const baseUrl = config.baseUrl;

const CreatePersonForm = ({ show, handleClose }) => {
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [fatherId, setFatherId] = useState("");
    const [description, setDescription] = useState("");
    const [showSpouseForm, setShowSpouseForm] = useState(false);
    const [spouseName, setSpouseName] = useState("");
    const [spouseGender, setSpouseGender] = useState("");
    const [spouseDescription, setSpouseDescription] = useState("");
    const [father, setFather] = useState([]);
    const [showList, setShowList] = useState(false);
    const [fatherName, setFatherName] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const personData = {
            name,
            gender,
            fatherId,
            description,
        };

        const spouseData = showSpouseForm
            ? {
                  name: spouseName,
                  gender: spouseGender,
                  description: spouseDescription,
              }
            : null;

        try {
            const response = await axios.post(
                `${baseUrl}/people/create-person`,
                {
                    person: personData,
                    spouse: spouseData,
                }
            );

            console.log("Response from server:", response.data);
            handleClose();
            // window.location.reload();
            toast.success("Thêm thành viên mới thành công!");
        } catch (error) {
            console.error("Error sending data:", error);
        }
    };
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(
                    `${baseUrl}/people/get-all-father`
                );
                setFather(response.data.data);
            } catch (error) {
                console.error("Error fetching family data:", error);
                toast.error(
                    "Error fetching family data. Please try again later.",
                    {
                        autoClose: 10000,
                    }
                );
            }
        };
        getData();
    }, [baseUrl]);

    const handleInputClick = () => {
        setShowList(true);
    };
    const handleListClick = (id, name) => {
        setFatherId(id);
        setFatherName(name);
        setShowList(false);
    };
    const handleInputChange = (e) => {
        setFatherName(e.target.value);
        setShowList(true);
    };
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Thêm thành viên mới</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Họ tên</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nhập họ tên"
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Giới tính</Form.Label>
                        <Form.Control
                            as="select"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            required
                        >
                            <option value="">Chọn giới tính</option>
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Bố</Form.Label>
                        <Form.Control
                            type="text"
                            value={fatherName}
                            onChange={handleInputChange}
                            onClick={handleInputClick}
                            placeholder="Chọn tên bố"
                        />
                        {showList && (
                            <ListGroup className="list-group-horizontal">
                                {father?.map((fa, index) => (
                                    <ListGroup.Item
                                        key={index}
                                        value={fa.id}
                                        onClick={() =>
                                            handleListClick(fa.id, fa.name)
                                        }
                                    >
                                        {fa.name}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Mô tả</Form.Label>
                        <Form.Control
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Nhập mô tả"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Vợ/Chồng</Form.Label>
                        <br />
                        <Button
                            variant="info"
                            onClick={() => setShowSpouseForm(!showSpouseForm)}
                        >
                            Thêm vợ/chồng
                        </Button>
                    </Form.Group>
                    {showSpouseForm && (
                        <>
                            <Form.Group>
                                <Form.Label>Tên vợ/chồng</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={spouseName}
                                    onChange={(e) =>
                                        setSpouseName(e.target.value)
                                    }
                                    placeholder="Nhập họ tên"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Giới tính vợ/chồng</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={spouseGender}
                                    onChange={(e) =>
                                        setSpouseGender(e.target.value)
                                    }
                                >
                                    <option value="male">Nam</option>
                                    <option value="female">Nữ</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Mô tả vợ/chồng</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={spouseDescription}
                                    onChange={(e) =>
                                        setSpouseDescription(e.target.value)
                                    }
                                    placeholder="Nhập mô tả"
                                />
                            </Form.Group>
                        </>
                    )}
                    <Button
                        variant="success"
                        type="submit"
                        style={{ marginTop: "12px" }}
                    >
                        Thêm mới
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default CreatePersonForm;
