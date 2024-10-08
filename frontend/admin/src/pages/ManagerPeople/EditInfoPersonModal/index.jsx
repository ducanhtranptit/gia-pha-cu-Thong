import React, { useEffect, useState, useRef, useMemo } from "react";
import PeopleAPI from "../../../api/people.js";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import { useDropzone } from "react-dropzone";
import "react-quill/dist/quill.snow.css";
import "./style.css";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import { baseUrl } from "../../../config/url-config.js";
import { getCookie } from "../../../utils/cookie.js";
import { ACCESSTOKEN_KEY } from "../../../config/index.js";

const EditPersonFormModal = ({ show, handleClose, person, fetchData }) => {
	const initialState = useMemo(
		() => ({
			name: "",
			gender: "",
			fatherId: "",
			description: "",
			avt: "",
			showSpouseForm: false,
			spouseName: "",
			spouseGender: "",
			spouseBorn: null,
			spouseDateOfDeath: null,
			spouseDescription: "",
			spouseAvt: "",
			father: [],
			showList: false,
			fatherName: "",
			born: null,
			dateOfDeath: null,
		}),
		[]
	);

	const initialErrorState = {
		name: "",
		gender: "",
		fatherId: "",
		spouseName: "",
		spouseGender: "",
	};

	const [formData, setFormData] = useState(initialState);
	const [errors, setErrors] = useState(initialErrorState);
	const [fileUrl, setFileUrl] = useState("");
	const [spouseFileUrl, setSpouseFileUrl] = useState("");
	const [status, setStatus] = useState(0);
	const [statusSpouse, setStatusSpouse] = useState(0);
	const dropdownRef = useRef(null);

	const handleDrop = (acceptedFiles) => {
		const file = acceptedFiles[0];
		const formData = new FormData();
		formData.append("file", file);
		const accessToken = getCookie(ACCESSTOKEN_KEY);

		fetch(baseUrl + "/upload", {
			method: "POST",
			body: formData,
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setFileUrl(baseUrl + `/upload/${data.fileName}`);
				setFormData((prevState) => ({
					...prevState,
					avt: data.fileName,
				}));
			})
			.catch((error) => {
				console.error("Error uploading file:", error);
				toast.error("Error uploading file. Please try again later.", {
					autoClose: 10000,
				});
			});
	};

	const handleSpouseDrop = (acceptedFiles) => {
		const file = acceptedFiles[0];
		const formData = new FormData();
		formData.append("file", file);
		const accessToken = getCookie(ACCESSTOKEN_KEY);

		fetch(baseUrl + "/upload", {
			method: "POST",
			body: formData,
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setSpouseFileUrl(baseUrl + `/upload/${data.fileName}`);
				setFormData((prevState) => ({
					...prevState,
					spouseAvt: data.fileName,
				}));
			})
			.catch((error) => {
				console.error("Error uploading file:", error);
				toast.error("Error uploading file. Please try again later.", {
					autoClose: 10000,
				});
			});
	};

	const { getRootProps, getInputProps } = useDropzone({
		onDrop: handleDrop,
		accept: {
			"image/jpeg": [".jpg", ".jpeg"],
		},
	});
	const { getRootProps: getSpouseRootProps, getInputProps: getSpouseInputProps } = useDropzone({
		onDrop: handleSpouseDrop,
		accept: {
			"image/jpeg": [".jpg", ".jpeg"],
		},
	});

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
						spouseAvt: spouse.filePath,
						spouseBorn: spouse.born,
						spouseDateOfDeath: spouse.dateOfDeath,
					}));
					if (spouse.dateOfDeath) {
						setStatusSpouse(1);
					}
					if (spouse.filePath) setSpouseFileUrl(baseUrl + `/upload/${spouse.filePath}`);
				} else {
					throw new Error("Invalid response format from API");
				}
			} catch (error) {
				console.error("Error fetching spouse information:", error);
				toast.error("Error fetching spouse information.");
			}
		};

		const fetchFather = async (id) => {
			try {
				const response = await PeopleAPI.getOnePerson(id);
				if (response && response.data && typeof response.data === "object") {
					const father = response.data;
					setFormData((prevState) => ({
						...prevState,
						fatherName: father.name,
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
				avt: person.filePath,
				showSpouseForm: !!person.spouseId,
				born: person.born,
				dateOfDeath: person?.dateOfDeath,
			}));

			if (person.dateOfDeath) {
				setStatus(1);
			}

			if (person.filePath) setFileUrl(baseUrl + `/upload/${person.filePath}`);

			if (person.spouseId) {
				fetchSpouseData(person.spouseId);
			}
		}

		if (person.fatherId) {
			fetchFather(person.fatherId);
		}
	}, [person, initialState]);

	const resetForm = () => {
		setFormData(initialState);
		setErrors(initialErrorState);
		setFileUrl("");
		setSpouseFileUrl("");
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
		if (!formData.fatherId && person.fatherId !== null) {
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
			filePath: formData.avt,
			born: formData.born,
			dateOfDeath: formData.dateOfDeath,
		};

		const spouseData = formData.showSpouseForm
			? {
					name: formData.spouseName,
					gender: formData.spouseGender,
					description: formData.spouseDescription,
					filePath: formData.spouseAvt,
					born: formData.spouseBorn,
					dateOfDeath: formData.spouseDateOfDeath,
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
			fetchData();
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
			size="lg"
		>
			<Modal.Header closeButton>
				<Modal.Title>Chỉnh sửa thông tin thành viên</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit}>
					<Form.Group className="form-group">
						<Form.Label>Avatar</Form.Label>
						<div {...getRootProps()} className="dropzone">
							<input {...getInputProps()} />
							{fileUrl ? <img src={fileUrl} alt="Avatar" className="avatar-preview" /> : <Button variant="btn btn-outline-info">Thêm ảnh</Button>}
						</div>
					</Form.Group>
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

								<Dropdown.Menu defaultValue={formData.fatherId}>
									{formData.father?.map((fa, index) => {
										if (fa.id !== person.id) {
											return (
												<Dropdown.Item key={index} onClick={() => handleListClick(fa.id, fa.name)}>
													{fa.name}
												</Dropdown.Item>
											);
										}
										return null;
									})}
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
							<DatePicker selected={formData.born} onChange={(date) => setFormData((prev) => ({ ...prev, born: date }))} className="datetimepicker" />
						</Form.Group>
						{+status === 1 && (
							<Form.Group className="col-6">
								<Form.Label className="label-date">Ngày mất</Form.Label>
								<DatePicker selected={formData.dateOfDeath} onChange={(date) => setFormData((prev) => ({ ...prev, dateOfDeath: date }))} className="datetimepicker" />
							</Form.Group>
						)}
					</div>

					<Form.Group className="full-width">
						<Form.Label>Tiểu sử</Form.Label>
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
							<Form.Group className="form-group">
								<Form.Label>Avatar vợ/chồng</Form.Label>
								<div {...getSpouseRootProps()} className="dropzone">
									<input {...getSpouseInputProps()} />
									{spouseFileUrl ? <img src={spouseFileUrl} alt="Spouse Avatar" className="avatar-preview" /> : <Button variant="btn btn-outline-info">Thêm ảnh</Button>}
								</div>
							</Form.Group>
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
									<DatePicker selected={formData.spouseBorn} onChange={(date) => setFormData((prev) => ({ ...prev, spouseBorn: date }))} className="datetimepicker" />
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
											className="datetimepicker"
										/>
									</Form.Group>
								)}
							</div>
							<Form.Group className="full-width">
								<Form.Label>Tiểu sử vợ/chồng</Form.Label>
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
