import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PeopleAPI from "../../api/people.js"
import { toast } from "react-toastify";
import img from "../../public/no-avatar.png";
import "./style.css";

const PersonInfo = () => {
	const { name } = useParams();
	const [personDetails, setPersonDetails] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchPersonDetails = async () => {
			if (name) {
				setLoading(true);
				try {
					const response = await PeopleAPI.getPersonInfo(name);
					const responseData = response.data;
					setPersonDetails(responseData);
				} catch (error) {
					toast.error("Error fetching family data. Please try again later.", {
						autoClose: 10000,
					});
				} finally {
					setLoading(false);
				}
			}
		};

		fetchPersonDetails();
	}, [name]);

	const getTitle = () => {
		if (personDetails && personDetails.person && personDetails.person.gender) {
			return personDetails.person.gender === "male" ? `THÔNG TIN ÔNG ${personDetails.person.name.toUpperCase()}` : `THÔNG TIN BÀ ${personDetails.person.name.toUpperCase()}`;
		} else {
			return "THÔNG TIN";
		}
	};

	return (
		<div className="mt-5 col-12">
			<div className="row">
				<div className="mt-5 col-md-4 d-flex justify-content-center align-items-center">
					<img src={img} className="img-fluid" alt="Avatar" />
				</div>
				<div className="mt-5 col-md-7">
					{loading && <div className="alert alert-info">Loading...</div>}
					{personDetails && personDetails.person && (
						<div className="card mt-3">
							<div className="card-header">
								<h2>{getTitle()}</h2>
							</div>
							<div className="card-body">
								<p>
									<strong>Họ và tên:</strong> {personDetails.person.name}
								</p>
								<p>
									<strong>Vợ/chồng:</strong>{" "}
									{personDetails.spouse && personDetails.spouse.name ? (
										<Link to={`/person-infor/${personDetails.spouse.name}`} className="link-style">
											{personDetails.spouse.name}
										</Link>
									) : (
										"N/A"
									)}
								</p>
								<p>
									<strong>Bố:</strong>{" "}
									{personDetails.father && personDetails.father.name ? (
										<Link to={`/person-infor/${personDetails.father.name}`} className="link-style">
											{personDetails.father.name}
										</Link>
									) : (
										"N/A"
									)}
								</p>
								{personDetails.children && personDetails.children.length > 0 && (
									<div>
										<strong>Con:</strong>
										<ul>
											{personDetails.children.map((child, index) => (
												<li key={index}>
													<Link to={`/person-infor/${child.name}`} className="link-style">
														{child.name}
													</Link>
												</li>
											))}
										</ul>
									</div>
								)}
								<p>
									<strong>Tiểu sử:</strong> {personDetails.person.description ? personDetails.person.description : "N/A"}
								</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default PersonInfo;
