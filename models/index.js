import Sequelize from 'sequelize'

import User from './user'
import Recipe from './recipe'
import Catalog from './dict/catalog'
import Kitchen from './dict/kitchen'

import configJSON from '../config/config'

const env = process.env.NODE_ENV || 'development'
const config = configJSON[env]
const sequelize = new Sequelize(config.database, config.username, config.password, config)

const models = {
  User: User.init(sequelize, Sequelize),
  Recipe: Recipe.init(sequelize, Sequelize),
  Catalog: Catalog.init(sequelize, Sequelize),
  Kitchen: Kitchen.init(sequelize, Sequelize)
}

Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models))

const db = {
  ...models,
  sequelize
}

export default db
