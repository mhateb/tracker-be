import Sequelize from 'sequelize'

import User from './user'
import Pack from './pack'
import Word from './word'
import configJSON from '../../config/config'

const env = process.env.NODE_ENV || 'development'
const config = configJSON[env]
const sequelize = new Sequelize(config.database, config.username, config.password, config)

const models = {
  User: User.init(sequelize, Sequelize),
  Pack: Pack.init(sequelize, Sequelize),
  Word: Word.init(sequelize, Sequelize)
}

Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models))

const db = {
  ...models,
  sequelize
}

export default db
