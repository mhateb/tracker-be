import { Model } from "sequelize";

class Pack extends Model {
  toJSON = () => {
    return {
      id: this.id,
      title: this.title,
      userId: this.userId,
      trueAnswers: this.trueAnswers,
      falseAnswers: this.falseAnswers,
      rating: this.rating
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
        title: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true
          }
        },
        trueAnswers: {
          type: DataTypes.INTEGER,
          allowNull: false    
        },
        falseAnswers: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        rating: {
          type: DataTypes.INTEGER,
          allowNull: false  
        }
      },
      { 
        tableName: "packs",
        sequelize
      }
    )
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: true
      }
    });
  }
}

export default Pack