import { Model } from 'sequelize'

class IngridientRecipes extends Model {
  toJSON = () => {
    return {
      id: this.id,
      recipeId: this.recipeId,
      stepNumber: this.stepNumber,
      text: this.text
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
        stepNumber: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        text: {
          type: DataTypes.TEXT,
          allowNull: false
        }
      },
      {
        tableName: 'step_recipe_instructions',
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
  }
}

export default IngridientRecipes
