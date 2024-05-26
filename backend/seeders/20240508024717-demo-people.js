"use strict";
const dummyData = require("./dummy/people.dummy.js");
const familyTree = dummyData.familyTree;
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
