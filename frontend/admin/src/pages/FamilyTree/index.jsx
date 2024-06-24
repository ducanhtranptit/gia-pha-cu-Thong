import React, { useState, useEffect } from "react";
import PeopleAPI from "../../api/people.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser, FaHeart } from "react-icons/fa";
import config from "../../config/url-config.js";
import "./style.css";

const FamilyTree = () => {
	const baseUrl = config.baseUrl;
	const [familyData, setFamilyData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await PeopleAPI.getFamilyTree();
				setFamilyData(response.data);
			} catch (error) {
				console.error("Error fetching family data:", error);
				toast.error("Error fetching family data. Please try again later.", {
					autoClose: 10000,
				});
			}
		};

		fetchData();
	}, [baseUrl]);

	const renderFamilyTree = (person, level = 0) => {
		return (
			<div key={person.name} className="tree-node">
				<div className="person-info">
					<h2>
						<FaUser /> {person.name}
					</h2>
					<p>
						<FaHeart /> Vợ/chồng: {person.spouse || "Không có"}
					</p>
				</div>
				{person.children.length > 0 && <div>{person.children.map((child) => renderFamilyTree(child, level + 1))}</div>}
			</div>
		);
	};

	return (
		<div className="family-tree-container">
			<h1 className="family-tree-page-title my-4">Phả đồ</h1>
			<div>
				<ToastContainer />
				{familyData ? renderFamilyTree(familyData) : <p>Loading...</p>}
			</div>
		</div>
	);
};

export default FamilyTree;
