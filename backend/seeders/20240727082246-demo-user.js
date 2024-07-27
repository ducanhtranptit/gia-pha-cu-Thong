"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        email: "admin@example.com",
        password:
          "$2a$10$oxmJPbDuSxQKQeGx8gbHFeyqJQj.b88u4R5WGnSNZ2ZQYksbosMfC",
        type: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
