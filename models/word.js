export default function (sequelize, Sequelize) {
  return sequelize.define('word', {

    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    original: {
      type: Sequelize.TEXT
    },

    translate: {
      type: Sequelize.TEXT
    },

    fk_pack_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'packs',
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
