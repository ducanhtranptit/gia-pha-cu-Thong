import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import "./style.css";
import { FaUser, FaHeart } from "react-icons/fa";

const FamilyTree = () => {
	const [familyData, setFamilyData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("http://localhost:2504/api/v1/core/people");
				setFamilyData(response.data.data);
			} catch (error) {
				console.error("Error fetching family data:", error);
				toast.error("Error fetching family data. Please try again later.", { autoClose: 10000 });
			}
		};

		fetchData();
	}, []);

	const renderFamilyTree = (person, level = 0) => {
		return (
			<div key={person.name} className="tree-node">
				<button>
					<Link to={`/person-infor?name=${person.name}`}>
						<h2>
							<FaUser /> {person.name}
						</h2>
						<p>
							<FaHeart /> Vợ/chồng: {person.spouse || "Không có"}
						</p>
					</Link>
				</button>
				{person.children.length > 0 && <div>{person.children.map((child) => renderFamilyTree(child, level + 1))}</div>}
			</div>
		);
	};

	return (
		<div className="family-tree-container mt-5 my-4">
			<h1 className="family-tree-page-title mt-5 my-4">Phả đồ</h1>
			<ToastContainer />
			{familyData ? renderFamilyTree(familyData) : <p>Loading...</p>}
		</div>
	);
};

export default FamilyTree;
