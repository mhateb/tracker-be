import crypto from 'crypto'
import jwt from 'jsonwebtoken'

export default function (sequelize, Sequelize) {
  const User = sequelize.define('user', {

    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    username: {
      type: Sequelize.TEXT
    },

    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true
      },
      get () {
        return this.getDataValue('email')
      }
    },

    hash: {
      type: Sequelize.STRING(1024),
      allowNull: false,
      set (val) {
        this.setDataValue('hash', crypto.pbkdf2Sync(val, this.salt, 10000, 512, 'sha512').toString('hex'))
      }
    },

    salt: {
      type: Sequelize.STRING,
      allowNull: false,
      set () {
        this.setDataValue('salt', crypto.randomBytes(16).toString('hex'))
      }
    },

    last_login: {
      type: Sequelize.DATE
    }

  })

  User.prototype.validatePassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
    return this.hash === hash
  }

  User.prototype.generateJWT = function () {
    return jwt.sign({
      id: this.id
    }, 'SECRET_KEY')
  }

  User.prototype.toAuthJSON = function () {
    return {
      id: this.id,
      email: this.email,
      token: this.generateJWT()
    }
  }

  return User
}
