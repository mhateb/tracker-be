'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ingridients', [
      {
        title: 'Молоко',
        description: 'описание',
        calorie: 500,
        fats: 343,
        squirrels: 23,
        carbohydrates: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Куриная грудка',
        description: 'описание',
        calorie: 530,
        fats: 43,
        squirrels: 3,
        carbohydrates: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Сахар',
        description: 'описание',
        calorie: 563,
        fats: 343,
        squirrels: 23,
        carbohydrates: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Картофель',
        description: 'описание',
        calorie: 500,
        fats: 343,
        squirrels: 23,
        carbohydrates: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ingridients', null, {})
  }
}
