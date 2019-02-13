export default function (sequelize, Sequelize) {
  const Pack = sequelize.define('pack', {

    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    title: {
      type: Sequelize.TEXT,
      validate: {
        notEmpty: true,
        notNull: true
      }
    },

    fk_user_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      },
      validate: {
        notEmpty: true,
        notNull: true,
        isInt: true
      }
    }
  })

  Pack.prototype.toAuthJSON = function () {
    return {
      id: this.id,
      title: this.title,
      user_id: this.fk_user_id
    }
  }

  return Pack
}
