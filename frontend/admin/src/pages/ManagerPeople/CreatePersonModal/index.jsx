import React, { useEffect, useState, useRef } from "react";
import PeopleAPI from "../../../api/people.js";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./style.css";
import "react-toastify/dist/ReactToastify.css";
import { useDropzone } from "react-dropzone";

const CreatePersonModal = ({ show, fetchData, handleClose }) => {
    const [fileUrl, setFileUrl] = useState(null);
    const initialState = {
        name: "",
        gender: "",
        fatherId: "",
        description: "",
        showSpouseForm: false,
        spouseName: "",
        spouseGender: "",
        spouseDescription: "",
        father: [],
        showList: false,
        fatherName: "",
        file: null,
    };

    const initialErrorState = {
        name: "",
        gender: "",
        fatherId: "",
        spouseName: "",
        spouseGender: "",
    };

    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState(initialErrorState);
    const dropdownRef = useRef(null);

    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            setFormData((prevState) => ({
                ...prevState,
                file: file,
            }));
            setFileUrl(URL.createObjectURL(file));
        },
    });

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setFormData((prevState) => ({
                    ...prevState,
                    showList: false,
                }));
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    const resetForm = () => {
        setFormData(initialState);
        setErrors(initialErrorState);
    };

    const validateForm = () => {
        const newErrors = { ...initialErrorState };
        let isValid = true;

        if (!formData.name.trim()) {
            newErrors.name = "Họ tên là bắt buộc.";
            isValid = false;
        }
        if (!formData.gender) {
            newErrors.gender = "Giới tính là bắt buộc.";
            isValid = false;
        }
        if (!formData.fatherId) {
            newErrors.fatherId = "Tên bố là bắt buộc.";
            isValid = false;
        }

        if (formData.showSpouseForm) {
            if (!formData.spouseName.trim()) {
                newErrors.spouseName = "Họ tên vợ/chồng là bắt buộc.";
                isValid = false;
            }
            if (!formData.spouseGender) {
                newErrors.spouseGender = "Giới tính vợ/chồng là bắt buộc.";
                isValid = false;
            }
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const personData = {
            name: formData.name,
            gender: formData.gender,
            fatherId: formData.fatherId,
            description: formData.description,
        };

        const spouseData = formData.showSpouseForm
            ? {
                  name: formData.spouseName,
                  gender: formData.spouseGender,
                  description: formData.spouseDescription,
              }
            : null;

        const formDataToSend = new FormData();
        formDataToSend.append("person", JSON.stringify(personData));
        formDataToSend.append("spouse", JSON.stringify(spouseData));
        if (formData.file) {
            formDataToSend.append("file", formData.file);
        }

        try {
            const response = await PeopleAPI.createPerson(formDataToSend);
            handleClose();
            resetForm();
            toast.success("Thêm thành viên mới thành công!");
            fetchData();
        } catch (error) {
            console.error("Error sending data:", error);
            toast.error(
                "Có lỗi xảy ra khi thêm thành viên. Vui lòng thử lại sau."
            );
        }
    };

    const handleInputClick = async () => {
        try {
            const response = await PeopleAPI.getAllFather();
            setFormData((prevState) => ({
                ...prevState,
                father: response.data,
                showList: true,
            }));
        } catch (error) {
            console.error("Error fetching family data:", error);
            toast.error("Error fetching family data. Please try again later.", {
                autoClose: 10000,
            });
        }
    };

    const handleListClick = (id, name) => {
        setFormData((prevState) => ({
            ...prevState,
            fatherId: id,
            fatherName: name,
            showList: false,
        }));
    };

    return (
        <Modal
            show={show}
            onHide={() => {
                handleClose();
                resetForm();
            }}
        >
            <Modal.Header closeButton>
                <Modal.Title>Thêm thành viên mới</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <div
                        {...getRootProps({ className: "dropzone" })}
                        className="dropzone"
                    >
                        <input {...getInputProps()} />
                        {formData.file ? (
                            <img
                                src={fileUrl}
                                alt="Preview"
                                className="preview-image"
                            />
                        ) : (
                            <p style={{ color: "red" }}>
                                Kéo và thả ảnh vào đây, hoặc nhấp để chọn ảnh
                            </p>
                        )}
                    </div>
                    <div className="form-row">
                        <Form.Group className="form-group">
                            <Form.Label>Họ tên</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData((prevState) => ({
                                        ...prevState,
                                        name: e.target.value,
                                    }))
                                }
                                placeholder="Nhập họ tên"
                                required
                                isInvalid={!!errors.name}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="form-group">
                            <Form.Label>Giới tính</Form.Label>
                            <Form.Control
                                as="select"
                                value={formData.gender}
                                onChange={(e) =>
                                    setFormData((prevState) => ({
                                        ...prevState,
                                        gender: e.target.value,
                                    }))
                                }
                                required
                                isInvalid={!!errors.gender}
                            >
                                <option value="">Chọn giới tính</option>
                                <option value="male">Nam</option>
                                <option value="female">Nữ</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                {errors.gender}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="form-group">
                            <Form.Label>Bố</Form.Label>
                            <Dropdown
                                ref={dropdownRef}
                                show={formData.showList}
                            >
                                <Dropdown.Toggle
                                    variant="light"
                                    id="dropdown-basic"
                                    onClick={handleInputClick}
                                    style={{
                                        border: "1px solid #ced4da",
                                        borderRadius: "4px",
                                    }}
                                    isInvalid={!!errors.fatherId}
                                >
                                    {formData.fatherName || "Chọn tên bố"}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {formData.father?.map((fa, index) => (
                                        <Dropdown.Item
                                            key={index}
                                            onClick={() =>
                                                handleListClick(fa.id, fa.name)
                                            }
                                        >
                                            {fa.name}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                            {errors.fatherId && (
                                <div className="invalid-feedback d-block">
                                    {errors.fatherId}
                                </div>
                            )}
                        </Form.Group>
                    </div>

                    <Form.Group className="full-width">
                        <Form.Label>Mô tả</Form.Label>
                        <ReactQuill
                            value={formData.description}
                            onChange={(value) =>
                                setFormData((prevState) => ({
                                    ...prevState,
                                    description: value,
                                }))
                            }
                            placeholder="Nhập mô tả"
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Vợ/Chồng</Form.Label>
                        <br />
                        <Button
                            variant="info"
                            onClick={() =>
                                setFormData((prevState) => ({
                                    ...prevState,
                                    showSpouseForm: !prevState.showSpouseForm,
                                }))
                            }
                        >
                            Thêm vợ/chồng
                        </Button>
                    </Form.Group>

                    {formData.showSpouseForm && (
                        <>
                            <div className="form-row">
                                <Form.Group className="form-group">
                                    <Form.Label>Tên vợ/chồng</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formData.spouseName}
                                        onChange={(e) =>
                                            setFormData((prevState) => ({
                                                ...prevState,
                                                spouseName: e.target.value,
                                            }))
                                        }
                                        placeholder="Nhập họ tên"
                                        isInvalid={!!errors.spouseName}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.spouseName}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="form-group">
                                    <Form.Label>Giới tính vợ/chồng</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={formData.spouseGender}
                                        onChange={(e) =>
                                            setFormData((prevState) => ({
                                                ...prevState,
                                                spouseGender: e.target.value,
                                            }))
                                        }
                                        required
                                        isInvalid={!!errors.spouseGender}
                                    >
                                        <option value="">Chọn giới tính</option>
                                        <option value="male">Nam</option>
                                        <option value="female">Nữ</option>
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.spouseGender}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <Form.Group className="full-width">
                                <Form.Label>Mô tả vợ/chồng</Form.Label>
                                <ReactQuill
                                    value={formData.spouseDescription}
                                    onChange={(value) =>
                                        setFormData((prevState) => ({
                                            ...prevState,
                                            spouseDescription: value,
                                        }))
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
                        Lưu
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default CreatePersonModal;
