'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('dinners', [
      {
        title: 'Запеканка',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Борщ',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Суши',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('dinners', null, {})
  }
}
