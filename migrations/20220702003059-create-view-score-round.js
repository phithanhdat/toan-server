'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const view_name = 'score_join'
    const query = 'SELECT s.id, s.stars, s.active, s.lock, r.name as round_name, r.type, s.round_id, s.user_id'
    + ' FROM `scores` as s INNER JOIN `rounds` as r'
    + ' ON s.round_id = r.id'
    return queryInterface.sequelize.query(`CREATE VIEW ${view_name} as ${query}`)
  },

  async down (queryInterface, Sequelize) {
    const view_name = 'score_join'
    await queryInterface.sequelize.query(`DROP VIEW ${view_name}`)
  }
};
