'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const scores = [];
    const star = 3;
    for (let i = 0; i < 70; i++) {
      const score = {
        stars: star,
        active: 1,
        lock: 0,
        user_id: 3,
        round_id: (i + 1),
        createdAt: new Date(),
        updatedAt: new Date()
      }
      scores.push(score);
    }
    return queryInterface.bulkInsert('Scores', scores);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Scores', null, {});
  }
};
