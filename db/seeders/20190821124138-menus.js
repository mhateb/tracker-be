'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('menu_food', [
      {
        title: 'Завтраки',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Обеды',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Ужины',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('menu_food', null, {})
  }
}
