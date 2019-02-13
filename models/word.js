export default function (sequelize, Sequelize) {
  const Word = sequelize.define('word', {

    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    original: {
      type: Sequelize.TEXT,
      validate: {
        notEmpty: true,
        notNull: true
      }
    },

    translate: {
      type: Sequelize.TEXT,
      validate: {
        notEmpty: true,
        notNull: true
      }
    },

    fk_pack_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'packs',
        key: 'id'
      },
      validate: {
        notEmpty: true,
        notNull: true,
        isInt: true
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
