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

const EditPersonFormModal = ({ show, handleClose, person }) => {
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

	useEffect(() => {
		const fetchSpouseData = async (spouseId) => {
			try {
				const response = await PeopleAPI.getOnePerson(spouseId);
				if (response && response.data && typeof response.data === "object") {
					const spouse = response.data;
					setFormData((prevState) => ({
						...prevState,
						spouseName: spouse.name,
						spouseGender: spouse.gender,
						spouseDescription: spouse.description,
					}));
				} else {
					throw new Error("Phản hồi từ API không đúng định dạng");
				}
			} catch (error) {
				console.error("Error fetching spouse information:", error);
				toast.error("Đã xảy ra lỗi khi lấy thông tin vợ/chồng.");
			}
		};

		if (person) {
			setFormData((prevState) => ({
				...initialState,
				name: person.name,
				gender: person.gender,
				fatherId: person.fatherId,
				fatherName: person.fatherName,
				description: person.description,
				showSpouseForm: !!person.spouseId,
			}));

			if (person.spouseId) {
				fetchSpouseData(person.spouseId);
			}
		}
	}, [person]);

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

		const updatedPerson = {
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

		try {
			await PeopleAPI.updatePerson(person.id, {
				person: updatedPerson,
				spouse: spouseData,
			});
			handleClose();
			toast.success("Thông tin thành viên đã được cập nhật thành công!");
			resetForm();
		} catch (error) {
			console.error("Error updating person:", error);
			toast.error("Đã xảy ra lỗi khi cập nhật thông tin thành viên.");
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
				<Modal.Title>Chỉnh sửa thông tin thành viên</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit}>
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
							<Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
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
							<Form.Control.Feedback type="invalid">{errors.gender}</Form.Control.Feedback>
						</Form.Group>
						<Form.Group className="form-group">
							<Form.Label>Bố</Form.Label>
							<Dropdown ref={dropdownRef} show={formData.showList}>
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
										<Dropdown.Item key={index} onClick={() => handleListClick(fa.id, fa.name)}>
											{fa.name}
										</Dropdown.Item>
									))}
								</Dropdown.Menu>
							</Dropdown>
							{errors.fatherId && <div className="invalid-feedback d-block">{errors.fatherId}</div>}
						</Form.Group>
					</div>

					<Form.Group className="full-width">
						<Form.Label>Mô tả</Form.Label>
						<ReactQuill
							value={formData.description}
							onChange={(content) =>
								setFormData((prevState) => ({
									...prevState,
									description: content,
								}))
							}
						/>
					</Form.Group>

					{formData.showSpouseForm ? (
						<>
							<Form.Group className="full-width">
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
								<Form.Control.Feedback type="invalid">{errors.spouseName}</Form.Control.Feedback>
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
									isInvalid={!!errors.spouseGender}
								>
									<option value="">Chọn giới tính</option>
									<option value="male">Nam</option>
									<option value="female">Nữ</option>
								</Form.Control>
								<Form.Control.Feedback type="invalid">{errors.spouseGender}</Form.Control.Feedback>
							</Form.Group>
							<Form.Group className="full-width">
								<Form.Label>Mô tả vợ/chồng</Form.Label>
								<ReactQuill
									value={formData.spouseDescription}
									onChange={(content) =>
										setFormData((prevState) => ({
											...prevState,
											spouseDescription: content,
										}))
									}
								/>
							</Form.Group>
						</>
					) : (
						<Form.Group>
							<Form.Label>Vợ/Chồng</Form.Label>
							<br />
							<Button
								variant="info"
								onClick={() =>
									setFormData((prevState) => ({
										...prevState,
										showSpouseForm: true,
									}))
								}
							>
								Thêm vợ/chồng
							</Button>
						</Form.Group>
					)}

					<Button variant="success" type="submit" style={{ marginTop: "12px" }}>
						Lưu
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default EditPersonFormModal;
