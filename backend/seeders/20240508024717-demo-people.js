"use strict";

const familyTree = [
	{ name: "Cụ ông", gender: "male", spouseId: 2, fatherId: null },
	{ name: "Cụ bà", gender: "female", spouseId: 1, fatherId: null },
	{ name: "Vợ của Con 1", gender: "female", spouseId: 3, fatherId: null },
	{ name: "Con 1", gender: "male", spouseId: 4, fatherId: 1 },
	{ name: "Vợ của Con 2", gender: "female", spouseId: 5, fatherId: null },
	{ name: "Con 2", gender: "male", spouseId: 6, fatherId: 1 },
	{ name: "Vợ của Cháu 1", gender: "female", spouseId: 8, fatherId: null },
	{ name: "Cháu 1", gender: "male", spouseId: 9, fatherId: 3 },
	{ name: "Cháu 2", gender: "female", spouseId: null, fatherId: 3 },
	{ name: "Con 3", gender: "female", spouseId: null, fatherId: 1 },
	{ name: "Cháu 3", gender: "male", spouseId: null, fatherId: 5 },
	{ name: "Cháu 4", gender: "female", spouseId: null, fatherId: 5 },
	{ name: "Chắt 1", gender: "male", spouseId: 14, fatherId: 8 },
	{ name: "Vợ của Chắt 1", gender: "female", spouseId: 13, fatherId: null },
	{ name: "Chút 1", gender: "female", spouseId: null, fatherId: 13 },
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
				createdAt: new Date(),
				updatedAt: new Date(),
			}))
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("People", null, {});
	},
};
