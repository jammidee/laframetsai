'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    // Step 1: Delete or truncate data (remove existing rows)
    await queryInterface.bulkDelete('tbllookups', null, {});

    // Step 2: Reset auto-increment counter for the ID column
    await queryInterface.sequelize.query('ALTER TABLE tbllookups AUTO_INCREMENT = 1');

    // Step 3: Insert new data (seed data)
    await queryInterface.bulkInsert('tbllookups', [
      {
        keyid: 'DEPARTMENT',
        colid: 'IT',
        description: 'IT Department',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        keyid: 'DEPARTMENT',
        colid: 'SALES',
        description: 'Sales Department',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        keyid: 'DEPARTMENT',
        colid: 'PURCHASING',
        description: 'Purchasing Department',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        keyid: 'DEPARTMENT',
        colid: 'HR',
        description: 'HR Department',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ]);
    

  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('tbllookups', null, {});

  }
};
