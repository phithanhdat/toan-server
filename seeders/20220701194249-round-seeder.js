'use strict';

const TOTAL_ROWS = 100;


module.exports = {
  async up (queryInterface, Sequelize) {
    const rounds = []
    for (let i = 0; i < TOTAL_ROWS; i++) {
      const round = {
        name: '' + (i + 1),
        type: i <= 50 ? 'free' : 'lock',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      rounds.push(round);
    }
    return queryInterface.bulkInsert('Rounds', rounds);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Rounds', null, {});
  }
};
