'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    // Step 1: Delete or truncate data (remove existing rows)
    await queryInterface.bulkDelete('tbldepartments', null, {});

    // Step 2: Reset auto-increment counter for the ID column
    await queryInterface.sequelize.query('ALTER TABLE tbldepartments AUTO_INCREMENT = 1');


    // Step 3: Insert new data (seed data)
    await queryInterface.bulkInsert('tbldepartments', [
        {
          colid: 'Jammi Dee',
          description: 'jammi_dee@yahoo.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          colid: 'Saoirse Dee',
          description: 'saoirse_dee@yahoo.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },

    ]);

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('tbldepartments', null, {});

  }
};
