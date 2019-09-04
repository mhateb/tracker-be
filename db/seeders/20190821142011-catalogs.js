'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('catalogs', [
      {
        title: 'Catalog1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Catalog2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Catalog3',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('catalogs', null, {})
  }
}
