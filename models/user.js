import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { Model } from 'sequelize'

class User extends Model {
  toJSON = () => {
    return {
      id: this.id,
      email: this.email,
      token: this.generateJWT()
    }
  }

  generateJWT = () => {
    return jwt.sign({ id: this.id }, 'SECRET_KEY')
  }

  validatePassword = (password) => {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')

    return this.hash === hash
  }

  static init (sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        firstName: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
          validate: {
            min: 6,
            max: 20
          }
        },
        lastName: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
          validate: {
            min: 6,
            max: 20
          }
        },
        about: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
          validate: {
            min: 6,
            max: 20
          }
        },
        email: {
          type: DataTypes.STRING,
          validate: {
            isEmail: true,
            min: 2,
            max: 100
          }
        },
        hash: {
          type: DataTypes.STRING(1024),
          allowNull: false,
          set (val) {
            this.setDataValue('hash', crypto.pbkdf2Sync(val, this.salt, 10000, 512, 'sha512').toString('hex'))
          }
        },
        salt: {
          type: DataTypes.STRING,
          allowNull: false,
          set () {
            this.setDataValue('salt', crypto.randomBytes(16).toString('hex'))
          }
        }
      },
      {
        tableName: 'users',
        sequelize
      }
    )
  }
}

export default User
