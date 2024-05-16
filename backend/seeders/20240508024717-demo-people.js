"use strict";

const familyTree = [
	{ name: "Trần Văn Thông", gender: "male", spouseId: 2, fatherId: null, note: "rootPerson" },
	{ name: "Trần Thị Ảnh", gender: "female", spouseId: 1, fatherId: null, note: "" },
	{ name: "Trần Thái Khoan", gender: "male", spouseId: 4, fatherId: 1, note: "" },
	{ name: "Đinh Thị Huê", gender: "female", spouseId: 3, fatherId: null, note: "" },
	{ name: "Trần Hồng Liên", gender: "male", spouseId: 6, fatherId: 1, note: "" },
	{ name: "Phạm Thị Phương", gender: "female", spouseId: 5, fatherId: null, note: "" },
	{ name: "Trần Lương Lạc", gender: "male", spouseId: 8, fatherId: 1, note: "" },
	{ name: "Lê Thị Hoan", gender: "female", spouseId: 7, fatherId: null, note: "" },
	{ name: "Trần Thị Thu", gender: "female", spouseId: 10, fatherId: 1, note: "" },
	{ name: "Nguyễn Văn Oanh", gender: "male", spouseId: 9, fatherId: null, note: "" },
	{ name: "Trần Thị Túc", gender: "female", spouseId: 12, fatherId: 1, note: "" },
	{ name: "Tạ Hiến Thanh", gender: "male", spouseId: 11, fatherId: null, note: "" },
	{ name: "Trần Thị Cúc", gender: "female", spouseId: 14, fatherId: 1, note: "" },
	{ name: "Vũ Văn Inh", gender: "male", spouseId: 13, fatherId: null, note: "" },
	{ name: "Trần Thị Thìn", gender: "female", spouseId: 16, fatherId: 1, note: "" },
	{ name: "Đinh Văn Tuyết", gender: "male", spouseId: 15, fatherId: null, note: "" },
	{ name: "Trần Văn Thành", gender: "male", spouseId: null, fatherId: 1, note: "" },
	{ name: "Trần Văn Đỏ", gender: "male", spouseId: null, fatherId: 1, note: "" },
	{ name: "Trần Thị ...", gender: "female", spouseId: null, fatherId: 1, note: "" },
	{ name: "Trần Thị Ngoan", gender: "female", spouseId: null, fatherId: 3, note: "" },
	{ name: "Trần Thị Loan", gender: "female", spouseId: 22, fatherId: 3, note: "" },
	{ name: "Trần Văn Chí", gender: "male", spouseId: 21, fatherId: null, note: "" },
	{ name: "Trần Hồng Phú", gender: "male", spouseId: 24, fatherId: 5, note: "" },
	{ name: "Bùi Thị Quyên", gender: "female", spouseId: 23, fatherId: null, note: "" },
	{ name: "Trần Hồng Quý", gender: "male", spouseId: 26, fatherId: 5, note: "" },
	{ name: "Đoàn Thị Kim Anh", gender: "female", spouseId: 25, fatherId: null, note: "" },
	{ name: "Trần Hồng Vân", gender: "female", spouseId: 28, fatherId: 5, note: "" },
	{ name: "Nguyễn Cường Quyền", gender: "male", spouseId: 27, fatherId: null, note: "" },
	{ name: "Trần Xuân Hồng", gender: "male", spouseId: 30, fatherId: 7, note: "" },
	{ name: "Vũ Thị Huế", gender: "female", spouseId: 29, fatherId: null, note: "" },
	{ name: "Trần Thị Vui", gender: "female", spouseId: 32, fatherId: 7, note: "" },
	{ name: "Phạm Văn Duy", gender: "female", spouseId: 31, fatherId: null, note: "" },
	{ name: "Trần Quý Hai", gender: "male", spouseId: null, fatherId: 7, note: "" },
	{ name: "Trần Đức Anh", gender: "male", spouseId: null, fatherId: 23, note: "" },
	{ name: "Trần Hà Anh", gender: "female", spouseId: null, fatherId: 23, note: "" },
	{ name: "Trần Quang Tuấn", gender: "male", spouseId: null, fatherId: 25, note: "" },
	{ name: "Trần Ngọc Anh", gender: "female", spouseId: null, fatherId: 25, note: "" },
	{ name: "Trần Thị Diệu Linh", gender: "female", spouseId: null, fatherId: 29, note: "" },
	{ name: "Trần Thị Thu Hương", gender: "female", spouseId: null, fatherId: 29, note: "" },
	{ name: "Trần Quốc Khánh", gender: "male", spouseId: null, fatherId: 29, note: "" },
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
