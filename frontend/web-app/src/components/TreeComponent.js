import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FamilyTree = () => {
	const [familyData, setFamilyData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("http://localhost:2504/api/v1/core/people");
				setFamilyData(response.data.data);
			} catch (error) {
				console.error("Error fetching family data:", error);
				toast.error("Error fetching family data. Please try again later.", { autoClose: 5000 });
			}
		};

		fetchData();
	}, []);

	const renderFamilyTree = (person, level = 0) => {
		return (
			<div key={person.name} style={{ marginLeft: `${level * 20}px`, borderLeft: "1px solid black", paddingLeft: "10px" }}>
				<h3>{person.name}</h3>
				<p>Vợ/chồng: {person.spouse || "None"}</p>
				{person.children.length > 0 && <div>{person.children.map((child) => renderFamilyTree(child, level + 1))}</div>}
			</div>
		);
	};

	return (
		<div>
			<h2>Phả đồ</h2>
			<ToastContainer />
			{familyData ? renderFamilyTree(familyData) : <p>Loading...</p>}
		</div>
	);
};

export default FamilyTree;
