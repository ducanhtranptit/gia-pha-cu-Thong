const express = require("express");
const app = express();
const port = 3000;

const familyTree = [
	{ id: 1, name: "Cụ tổ", gender: "male", spouse: null, father: null },
	{ id: 111, name: "Cụ ông", gender: "male", spouse: 13, father: 1 },
	{ id: 13, name: "Cụ bà", gender: "female", spouse: 111, father: null },
	{ id: 14, name: "Con 1", gender: "male", spouse: 16, father: 111 },
	{ id: 16, name: "Vợ của Con 1", gender: "female", spouse: 14, father: null },
	{ id: 18, name: "Con 2", gender: "male", spouse: 19, father: 111 },
	{ id: 19, name: "Vợ của Con 2", gender: "female", spouse: 18, father: null },
	{ id: 21, name: "Con 3", gender: "female", spouse: null, father: 111 },
	{ id: 24, name: "Cháu 1", gender: "male", spouse: 25, father: 14 },
	{ id: 25, name: "Vợ của Cháu 1", gender: "female", spouse: 24, father: null },
	{ id: 27, name: "Cháu 2", gender: "female", spouse: null, father: 14 },
	{ id: 40, name: "Cháu 3", gender: "male", spouse: null, father: 18 },
	{ id: 31, name: "Cháu 4", gender: "female", spouse: null, father: 18 },
	{ id: 32, name: "Chắt 1", gender: "male", spouse: 58, father: 24 },
	{ id: 58, name: "Vợ của Chắt 1", gender: "female", spouse: 32, father: null },
	{ id: 66, name: "Chút 1", gender: "female", spouse: null, father: 32 },
];

function buildFamilyTree(person) {
	const getPerson = (id) => familyTree.find((person) => person.id === id);
	const spouse = person.spouse ? getPerson(person.spouse) : null;
	const children = familyTree.filter((child) => child.father === person.id);
	const jsonPerson = {
		name: person.name,
		spouse: spouse ? spouse.name : null,
		children: [],
	};
	children.forEach((child) => {
		const jsonChild = buildFamilyTree(child);
		jsonPerson.children.push(jsonChild);
	});
	return jsonPerson;
}

function convertToJSON(familyTree) {
	const rootPerson = familyTree.find((person) => person.father === null);
	const result = buildFamilyTree(rootPerson);
	return result;
}

app.get("/", (req, res) => {
	const familyJSON = convertToJSON(familyTree);
	res.json(familyJSON);
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
