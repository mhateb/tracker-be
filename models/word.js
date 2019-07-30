import { Model } from "sequelize";

class Word extends Model {
  toJSON = () => {
    return {
      id: this.id,
      original: this.original,
      translate: this.translate,
      packId: this.packId
    }
  }

  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        original: {
          type: DataTypes.TEXT,
          allowNull: false,
          validate: {
            notEmpty: true
          }
        },
        translate: {
          type: DataTypes.TEXT,
          allowNull: false,
          validate: {
            notEmpty: true
          }
        },
      },
      {
        tableName: "words",
        sequelize
      }
    )
  }

  static associate(models) {
    this.belongsTo(models.Pack, {
      foreignKey: {
        name: "packId",
        allowNull: true
      }
    });
  }
}

export default Word