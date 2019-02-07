export default function (sequelize, Sequelize) {
  const Pack = sequelize.define('pack', {

    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    title: {
      type: Sequelize.TEXT
    },

    fk_user_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id'
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
