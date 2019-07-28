import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { Model } from "sequelize";

class User extends Model {
  toJSON = () => {
    return {
      id: this.id,
      email: this.email,
      token: this.generateJWT()
    }
  }

  generateJWT = () => {
    return jwt.sign({id: this.id}, 'SECRET_KEY')
  }

  validatePassword = (password) => {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')

    return this.hash === hash
  }

  static init(sequelize, DataTypes) {
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
          type: DataTypes.STRING,
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
        tableName: "users",
        sequelize
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Pack);
  }
}

export default User