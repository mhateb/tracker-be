export default function (sequelize, Sequelize) {
  return sequelize.define('pack', {

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
    },

    created_at: {
      type: Sequelize.DATE
    },

    updated_at: {
      type: Sequelize.DATE
    }

  })
}
