'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Scores', // name of source model
      'user_id', // name of the key will be added
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // name of target
          key: 'id', // key of target model referencing to
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )
    .then(() => {
     return queryInterface.addColumn(
        'Scores', // source
        'round_id', // foreign key
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Rounds',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
     )
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'Scores', // source model
      'user_id' // key need to remove
    )
    .then(() => {
      return queryInterface.removeColumn(
        'Scores', //source
        'round_id', // foreign key
      )
    })
  }
};
