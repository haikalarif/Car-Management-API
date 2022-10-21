'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert("typeusers", [
      {
        id: 1,
        type: "Super Admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        type: "Admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        type: "Member",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("typeusers", null, {});
  }
};
