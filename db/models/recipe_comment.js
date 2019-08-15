import { Model } from 'sequelize'

class IngridientRecipes extends Model {
  toJSON = () => {
    return {
      id: this.id,
      user_id: this.userId,
      recipe_id: this.recipeId,
      comment: this.comment
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
        comment: {
          type: DataTypes.TEXT,
          allowNull: false,
          validate: {
            notEmpty: true
          }
        }
      },
      {
        tableName: 'recipe_comments',
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

    this.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      }
    })
  }
}

export default IngridientRecipes
