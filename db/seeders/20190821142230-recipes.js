'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('recipes', [
      {
        title: 'Запеканка творожная',
        description: 'описание',
        defaultPortion: 4,
        cookingTime: 40,
        userId: 1,
        catalogId: 1,
        menuId: 1,
        dinnerId: 1,
        kitchenId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('recipes', null, {})
  }
}
