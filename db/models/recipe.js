import { Model } from 'sequelize'

class Recipe extends Model {
  toJSON = () => {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      defaultPortion: this.defaultPortion,
      cooking_time: this.cookingTime,
      userId: this.userId,
      catalogId: this.catalogId,
      menuId: this.menuId,
      dinnerId: this.dinnerId,
      kitchenId: this.kitchenId
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

    this.belongsTo(models.MenuFood, {
      foreignKey: {
        name: 'menuId',
        allowNull: false
      }
    })

    this.belongsTo(models.Dinner, {
      foreignKey: {
        name: 'dinnerId',
        allowNull: false
      }
    })

    this.belongsTo(models.Kitchen, {
      foreignKey: {
        name: 'kitchenId',
        allowNull: false
      }
    })
  }
}

export default Recipe
