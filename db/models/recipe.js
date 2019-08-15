import { Model } from 'sequelize'

class Recipe extends Model {
  toJSON = () => {
    return {
      id: this.id,
      title: this.title,
      mini_description: this.miniDescription,
      description: this.description,
      default_portion: this.defaultPortion,
      cooking_time: this.cookingTime,
      user_id: this.userId,
      catalog_id: this.catalogId,
      menu_id: this.menuId,
      dinner_id: this.dinnerId,
      kitchen_id: this.kitchenId
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
        miniDescription: {
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
        defaultPortion: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            notEmpty: true
          }
        },
        cookingTime: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            notEmpty: true
          }
        }
      },
      {
        tableName: 'recipes',
        sequelize
      }
    )
  }

  static associate (models) {
    this.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      }
    })

    this.belongsTo(models.Catalog, {
      foreignKey: {
        name: 'catalogId',
        allowNull: false
      }
    })

    this.belongsTo(models.Menu, {
      foreignKey: {
        name: 'menuId',
        allowNull: true
      }
    })

    this.belongsTo(models.Dinner, {
      foreignKey: {
        name: 'dinnerId',
        allowNull: true
      }
    })

    this.belongsTo(models.Kitchen, {
      foreignKey: {
        name: 'kitchenId',
        allowNull: true
      }
    })
  }
}

export default Recipe
