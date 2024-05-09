"use strict";

const familyTree = [
	{ name: "Cụ ông", gender: "male", spouseId: null, fatherId: null },
	{ name: "Cụ bà", gender: "female", spouseId: null, fatherId: null },
	{ name: "Con 1", gender: "male", spouseId: null, fatherId: null },
	{ name: "Vợ của Con 1", gender: "female", spouseId: null, fatherId: null },
	{ name: "Con 2", gender: "male", spouseId: null, fatherId: null },
	{ name: "Vợ của Con 2", gender: "female", spouseId: null, fatherId: null },
	{ name: "Con 3", gender: "female", spouseId: null, fatherId: null },
	{ name: "Cháu 1", gender: "male", spouseId: null, fatherId: null },
	{ name: "Vợ của Cháu 1", gender: "female", spouseId: null, fatherId: null },
	{ name: "Cháu 2", gender: "female", spouseId: null, fatherId: null },
	{ name: "Cháu 3", gender: "male", spouseId: null, fatherId: null },
	{ name: "Cháu 4", gender: "female", spouseId: null, fatherId: null },
	{ name: "Chắt 1", gender: "male", spouseId: null, fatherId: null },
	{ name: "Vợ của Chắt 1", gender: "female", spouseId: null, fatherId: null },
	{ name: "Chút 1", gender: "female", spouseId: null, fatherId: null },
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
