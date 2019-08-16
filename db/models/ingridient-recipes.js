import { Model } from 'sequelize'

class IngridientRecipes extends Model {
  toJSON = () => {
    return {
      id: this.id,
      volumeId: this.volumeId,
      volume: this.volume,
      ingridientId: this.ingridientId,
      recipeId: this.recipeId
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
        volume: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            notEmpty: true
          }
        }
      },
      {
        tableName: 'ingridient_recipes',
        sequelize
      }
    )
  }

  static associate (models) {
    this.belongsTo(models.Recipe, {
      foreignKey: {
        name: 'recipeId',
        allowNull: false
      }
    })

    this.belongsTo(models.Ingridient, {
      foreignKey: {
        name: 'ingridientId',
        allowNull: false
      }
    })

    this.belongsTo(models.Volume, {
      foreignKey: {
        name: 'volumeId',
        allowNull: false
      }
    })
  }
}

export default IngridientRecipes
