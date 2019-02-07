export default function (sequelize, Sequelize) {
  const Word = sequelize.define('word', {

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
    }
  })

  Word.prototype.toAuthJSON = () => {
    return {
      id: this.id,
      original: this.original,
      translate: this.translate,
      fk_pack_id: this.fk_pack_id
    }
  }

  return Word
}
