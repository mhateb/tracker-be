import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'

import configJSON from '../config/config'

var env = process.env.NODE_ENV || 'development'
var config = configJSON[env]

var sequelize = new Sequelize(config.database, config.username, config.password, config)
var db = {}

fs
  .readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js')
  })
  .forEach(function (file) {
    var model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(function (modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
