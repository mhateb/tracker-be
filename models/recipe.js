import { Model } from 'sequelize'

class Recipe extends Model {
  toJSON = () => {
    return {
      id: this.id,
      original: this.original,
      translate: this.translate,
      packId: this.packId
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
        }
      },
      {
        tableName: 'recipes',
        sequelize
      }
    )
  }

  static associate (models) {
    this.belongsTo(models.Pack, {
      foreignKey: {
        name: 'packId',
        allowNull: true
      }
    })
  }
}

export default Recipe
