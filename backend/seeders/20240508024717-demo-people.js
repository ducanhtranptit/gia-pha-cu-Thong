"use strict";

const familyTree = [
	{ name: "Cụ ông", gender: "male", spouseId: 2, fatherId: null, note: "rootPerson" },
	{ name: "Cụ bà", gender: "female", spouseId: 1, fatherId: null, note: "" },
	{ name: "Con 1", gender: "male", spouseId: 4, fatherId: 1, note: "" },
	{ name: "Vợ của Con 1", gender: "female", spouseId: 3, fatherId: null, note: "" },
	{ name: "Con 2", gender: "male", spouseId: 6, fatherId: 1, note: "" },
	{ name: "Vợ của Con 2", gender: "female", spouseId: 5, fatherId: null, note: "" },
	{ name: "Cháu 1", gender: "male", spouseId: 8, fatherId: 3, note: "" },
	{ name: "Vợ của Cháu 1", gender: "female", spouseId: 7, fatherId: null, note: "" },
	{ name: "Cháu 2", gender: "female", spouseId: null, fatherId: 3, note: "" },
	{ name: "Con 3", gender: "female", spouseId: null, fatherId: 1, note: "" },
	{ name: "Cháu 3", gender: "male", spouseId: null, fatherId: 5, note: "" },
	{ name: "Cháu 4", gender: "female", spouseId: null, fatherId: 5, note: "" },
	{ name: "Chắt 1", gender: "male", spouseId: 14, fatherId: 7, note: "" },
	{ name: "Vợ của Chắt 1", gender: "female", spouseId: 13, fatherId: null, note: "" },
	{ name: "Chút 1", gender: "female", spouseId: null, fatherId: 13, note: "" },
];

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"People",
			familyTree.map((person) => ({
				name: person.name,
				gender: person.gender,
				spouseId: person.spouseId,
				fatherId: person.fatherId,
				note: person.note,
				createdAt: new Date(),
				updatedAt: new Date(),
			}))
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("People", null, {});
	},
};
