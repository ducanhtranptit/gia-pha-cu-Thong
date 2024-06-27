"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn("People", "filePath", {
            type: Sequelize.STRING, // Thay đổi loại dữ liệu theo nhu cầu của bạn
            allowNull: true, // Thay đổi thuộc tính này theo nhu cầu của bạn
        });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.removeColumn("People", "filePath");
    },
};
