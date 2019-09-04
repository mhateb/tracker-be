'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('volumes', [
      {
        title: 'гр.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'кг.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Стаканы',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('volumes', null, {})
  }
}
