import { Model } from 'sequelize'

class Kitchen extends Model {
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
        tableName: 'kitchens',
        sequelize
      }
    )
  }
}

export default Kitchen
