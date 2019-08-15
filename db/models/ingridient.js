import { Model } from 'sequelize'

class Ingridient extends Model {
  toJSON = () => {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      calorie: this.calorie,
      fats: this.fats,
      squirrels: this.squirrels,
      carbohydrates: this.carbohydrates
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
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
          validate: {
            notEmpty: true
          }
        },
        calorie: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            notEmpty: true
          }
        },
        fats: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            notEmpty: true
          }
        },
        squirrels: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            notEmpty: true
          }
        },
        carbohydrates: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            notEmpty: true
          }
        }
      },
      {
        tableName: 'ingridients',
        sequelize
      }
    )
  }
}

export default Ingridient
