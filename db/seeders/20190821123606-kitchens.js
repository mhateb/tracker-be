'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('kitchens', [
      {
        title: 'Русская',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Японская',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Итальянская',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('kitchens', null, {})
  }
}
