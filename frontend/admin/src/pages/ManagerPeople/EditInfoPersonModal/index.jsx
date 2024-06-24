import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import PeopleAPI from "../../../api/people.js";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import config from "../../../config/url-config.js";
import { toast } from "react-toastify";
import "./style.css";
import "react-toastify/dist/ReactToastify.css";

const baseUrl = config.baseUrl;

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

	const [formData, setFormData] = useState(initialState);
	const dropdownRef = useRef(null); // Thêm khai báo này

	useEffect(() => {
		if (person) {
			setFormData({
				...initialState,
				name: person.name,
				gender: person.gender,
				fatherId: person.fatherId,
				fatherName: person.fatherName,
				description: person.description,
				showSpouseForm: person.spouse ? true : false,
				spouseName: person.spouse?.name || "",
				spouseGender: person.spouse?.gender || "",
				spouseDescription: person.spouse?.description || "",
			});
		}
	}, [person]);

	const resetForm = () => {
		setFormData(initialState);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

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
			console.log('88888888');
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
			const response = await axios.get(`${baseUrl}/people/get-all-father`);
			setFormData((prevState) => ({
				...prevState,
				father: response.data.data,
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
							/>
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
							>
								<option value="">Chọn giới tính</option>
								<option value="male">Nam</option>
								<option value="female">Nữ</option>
							</Form.Control>
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
						</Form.Group>
					</div>

					<Form.Group className="full-width">
						<Form.Label>Mô tả</Form.Label>
						<Form.Control
							type="text"
							value={formData.description}
							onChange={(e) =>
								setFormData((prevState) => ({
									...prevState,
									description: e.target.value,
								}))
							}
							placeholder="Nhập mô tả"
						/>
					</Form.Group>

					{formData.spouseName ? (
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
								/>
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
								>
									<option value="male">Nam</option>
									<option value="female">Nữ</option>
								</Form.Control>
							</Form.Group>
							<Form.Group className="full-width">
								<Form.Label>Mô tả vợ/chồng</Form.Label>
								<Form.Control
									type="text"
									value={formData.spouseDescription}
									onChange={(e) =>
										setFormData((prevState) => ({
											...prevState,
											spouseDescription: e.target.value,
										}))
									}
									placeholder="Nhập mô tả"
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

					{formData.showSpouseForm && !formData.spouseName && (
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
								/>
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
								>
									<option value="male">Nam</option>
									<option value="female">Nữ</option>
								</Form.Control>
							</Form.Group>
							<Form.Group className="full-width">
								<Form.Label>Mô tả vợ/chồng</Form.Label>
								<Form.Control
									type="text"
									value={formData.spouseDescription}
									onChange={(e) =>
										setFormData((prevState) => ({
											...prevState,
											spouseDescription: e.target.value,
										}))
									}
									placeholder="Nhập mô tả"
								/>
							</Form.Group>
						</>
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
