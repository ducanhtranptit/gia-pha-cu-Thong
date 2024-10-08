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
import axios from "axios";
import { baseUrl } from "../../../config/url-config.js";
import DatePicker, { registerLocale } from "react-datepicker";
import { vi } from "date-fns/locale/vi";
import "react-datepicker/dist/react-datepicker.css";
import { getCookie } from "../../../utils/cookie.js";
import { ACCESSTOKEN_KEY } from "../../../config/index.js";

registerLocale("vi", vi);

const CreatePersonModal = ({ show, fetchData, handleClose }) => {
	const [fileUrl, setFileUrl] = useState(null);
	const [uploadedFileName, setUploadedFileName] = useState(null);
	const [spouseFileUrl, setSpouseFileUrl] = useState(null);
	const [uploadedSpouseFileName, setUploadedSpouseFileName] = useState(null);

	const initialState = {
		name: "",
		gender: "",
		fatherId: "",
		description: "",
		showSpouseForm: false,
		spouseName: "",
		spouseGender: "",
		spouseDescription: "",
		spouseBorn: null,
		spouseDateOfDeath: null,
		father: [],
		showList: false,
		fatherName: "",
		born: null,
		dateOfDeath: null,
	};

	const initialErrorState = {
		name: "",
		gender: "",
		fatherId: "",
		spouseName: "",
		spouseGender: "",
		dateOfDeath: "",
	};

	const [formData, setFormData] = useState(initialState);
	const [errors, setErrors] = useState(initialErrorState);
	const [status, setStatus] = useState(0);
	const [statusSpouse, setStatusSpouse] = useState(0);
	const dropdownRef = useRef(null);

	const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
		accept: {
			"image/jpeg": [".jpg", ".jpeg"],
		},
		onDrop: (acceptedFiles) => {
			const file = acceptedFiles[0];
			setFormData((prevState) => ({
				...prevState,
				file: file,
			}));
			setFileUrl(URL.createObjectURL(file));
			handleFileUpload(file);
		},
	});

	const {
		getRootProps: getSpouseRootProps,
		getInputProps: getSpouseInputProps,
		acceptedFiles: acceptedSpouseFiles,
	} = useDropzone({
		accept: {
			"image/jpeg": [".jpg", ".jpeg"],
		},
		onDrop: (acceptedFiles) => {
			const file = acceptedFiles[0];
			setFormData((prevState) => ({
				...prevState,
				spouseFile: file,
			}));
			setSpouseFileUrl(URL.createObjectURL(file));
			handleSpouseFileUpload(file);
		},
	});

	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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
		setFileUrl(null);
		setUploadedFileName(null);
		setSpouseFileUrl(null);
		setUploadedSpouseFileName(null);
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

		if (+status && !formData.dateOfDeath) {
			newErrors.dateOfDeath = "Vui lòng nhập ngày mất";
			toast.error("Vui lòng nhập ngày mất");
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

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
			setUploadedFileName(response.data.fileName);
		} catch (error) {
			console.error("Error uploading file:", error);
			toast.error("Có lỗi xảy ra khi upload ảnh. Vui lòng thử lại sau.");
		}
	};

	const handleSpouseFileUpload = async (file) => {
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
			setUploadedSpouseFileName(response.data.fileName);
		} catch (error) {
			console.error("Error uploading spouse file:", error);
			toast.error("Có lỗi xảy ra khi upload ảnh vợ/chồng. Vui lòng thử lại sau.");
		}
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
			filePath: uploadedFileName,
			born: formData.born,
			dateOfDeath: formData.dateOfDeath,
		};

		const spouseData = formData.showSpouseForm
			? {
					name: formData.spouseName,
					gender: formData.spouseGender,
					description: formData.spouseDescription,
					filePath: uploadedSpouseFileName,
					born: formData.spouseBorn,
					dateOfDeath: formData.spouseDateOfDeath,
			  }
			: null;

		const data = { person: personData, spouse: spouseData };
		try {
			await PeopleAPI.createPerson(data);
			handleClose();
			resetForm();
			toast.success("Thêm thành viên mới thành công!");
			fetchData();
		} catch (error) {
			console.error("Error sending data:", error);
			toast.error("Có lỗi xảy ra khi thêm thành viên. Vui lòng thử lại sau.");
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
			size="lg"
		>
			<Modal.Header closeButton>
				<Modal.Title>Thêm thành viên mới</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit}>
					<Form.Label>Ảnh đại diện</Form.Label>
					<div {...getRootProps({ className: "dropzone" })} className="dropzone">
						<input {...getInputProps()} />
						{fileUrl ? (
							<div className="box-image">
								<img src={fileUrl} alt="Preview" className="preview-image" />
								<span className="text-placeholder">Đổi ảnh</span>
							</div>
						) : (
							<Button variant="btn btn-outline-info">Thêm ảnh</Button>
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
					<div className="mt-2">
						<Form.Label>Tình trạng</Form.Label>
						<Form.Select
							value={status}
							onChange={(e) => {
								setStatus(e.target.value);
							}}
						>
							<option value={0}>Còn sống</option>
							<option value={1}>Đã mất</option>
						</Form.Select>
					</div>
					<div className="row mt-2">
						<Form.Group className="col-6">
							<Form.Label className="label-date">Ngày sinh</Form.Label>
							<DatePicker selected={formData.born} onChange={(date) => setFormData((prev) => ({ ...prev, born: date }))} locale="vi" className="datetimepicker" />
						</Form.Group>
						{+status === 1 && (
							<Form.Group className="col-6">
								<Form.Label className="label-date">Ngày mất</Form.Label>
								<DatePicker selected={formData.dateOfDeath} onChange={(date) => setFormData((prev) => ({ ...prev, dateOfDeath: date }))} locale="vi" className="datetimepicker" />
								<Form.Control.Feedback type="invalid">{errors.dateOfDeath}</Form.Control.Feedback>
							</Form.Group>
						)}
					</div>
					<Form.Group className="full-width">
						<Form.Label>Tiểu sử</Form.Label>
						<ReactQuill
							value={formData.description}
							onChange={(value) =>
								setFormData((prevState) => ({
									...prevState,
									description: value,
								}))
							}
							placeholder="nhập tiểu sử"
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
							<Form.Label>Ảnh đại diện vợ/chồng</Form.Label>
							<div {...getSpouseRootProps({ className: "dropzone" })} className="dropzone">
								<input {...getSpouseInputProps()} />
								{spouseFileUrl ? (
									<div className="box-image">
										<img src={spouseFileUrl} alt="Preview" className="preview-image" />
										<span className="text-placeholder">Đổi ảnh</span>
									</div>
								) : (
									<Button variant="btn btn-outline-info">Thêm ảnh</Button>
								)}
							</div>
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
										required
										isInvalid={!!errors.spouseGender}
									>
										<option value="">Chọn giới tính</option>
										<option value="male">Nam</option>
										<option value="female">Nữ</option>
									</Form.Control>
									<Form.Control.Feedback type="invalid">{errors.spouseGender}</Form.Control.Feedback>
								</Form.Group>
							</div>
							<div className="mt-2">
								<Form.Label>Tình trạng</Form.Label>
								<Form.Select
									value={statusSpouse}
									onChange={(e) => {
										setStatusSpouse(e.target.value);
									}}
								>
									<option value={0}>Còn sống</option>
									<option value={1}>Đã mất</option>
								</Form.Select>
							</div>
							<div className="row mt-2">
								<Form.Group className="col-6">
									<Form.Label className="label-date">Ngày sinh</Form.Label>
									<DatePicker selected={formData.spouseBorn} onChange={(date) => setFormData((prev) => ({ ...prev, spouseBorn: date }))} locale="vi" className="datetimepicker" />
								</Form.Group>
								{+statusSpouse === 1 && (
									<Form.Group className="col-6">
										<Form.Label className="label-date">Ngày mất</Form.Label>
										<DatePicker
											selected={formData.spouseDateOfDeath}
											onChange={(date) =>
												setFormData((prev) => ({
													...prev,
													spouseDateOfDeath: date,
												}))
											}
											locale="vi"
											className="datetimepicker"
										/>
									</Form.Group>
								)}
							</div>
							<Form.Group className="full-width">
								<Form.Label>Tiểu sử vợ/chồng</Form.Label>
								<ReactQuill
									value={formData.spouseDescription}
									onChange={(value) =>
										setFormData((prevState) => ({
											...prevState,
											spouseDescription: value,
										}))
									}
									placeholder="nhập tiểu sử"
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

export default CreatePersonModal;
