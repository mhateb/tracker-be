import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { Model } from 'sequelize'

class User extends Model {
<<<<<<< HEAD:db/models/user.js
=======
  toJSON = () => {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      token: this.generateJWT()
    }
  }

>>>>>>> 9e7754b362bfd95597dec1feaac5821a3fefff45:db/models/user.js
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
        username: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: true,
          validate: {
            min: 6,
            max: 20
          }
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            min: 6,
            max: 20
          }
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            min: 6,
            max: 20
          }
        },
        about: {
          type: DataTypes.STRING,
          allowNull: true,
          validate: {
            min: 6,
            max: 20
          }
        },
        email: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
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
