import { Model } from 'sequelize'

class Dinner extends Model {
  toJSON = () => {
    return {
      id: this.id,
      title: this.title
    }
  }

  static init (sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        title: {
          type: DataTypes.TEXT,
          allowNull: false,
          validate: {
            notEmpty: true
          }
        }
      },
      {
        tableName: 'dinners',
        sequelize
      }
    )
  }
}

export default Dinner
