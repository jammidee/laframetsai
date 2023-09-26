'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    // Step 1: Delete or truncate data (remove existing rows)
    await queryInterface.bulkDelete('tblusers', null, {});

    // Step 2: Reset auto-increment counter for the ID column
    await queryInterface.sequelize.query('ALTER TABLE tblusers AUTO_INCREMENT = 1');


    // Step 3: Insert new data (seed data)
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('tblusers', [
        {
          name: 'Jammi Dee',
          email: 'jammi_dee@yahoo.com',
          password: 'sadmin12345!',
          lastseen: new Date(),
          lastupdate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Saoirse Dee',
          email: 'saoirse_dee@yahoo.com',
          password: 'sadmin12345!',
          lastseen: new Date(),
          lastupdate: new Date(),
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
      await queryInterface.bulkDelete('tblusers', null, {});
  }
};
