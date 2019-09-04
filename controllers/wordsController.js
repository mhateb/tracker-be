import models from 'models'

const create = (req, res) => {
  const { body: { word } } = req

  models.Word.create({
    ...word
  })
    .then((newWord) => {
      res.json({ word: newWord, status: 200 })
    })
    .catch((err) => {
      res.json({ error: err.message })
    })
}

const getByPack = (req, res) => {
  const { user, query: { packId } } = req

  console.log(packId)

  models.Pack.findOne({ where: {
    userId: user.id,
    id: packId
  } })
    .then((foundPack) => {
      return models.Word.findAll({
        where: {
          packId: foundPack.id
        }
      })
    })
    .then(words => {
      res.json({
        words: words
      })
    })
    .catch((err) => {
      console.log(err)
      res.json({ error: err.message })
    })
}

const deleteWord = (req, res) => {
  const { user, body: { word } } = req

  models.Pack.findOne({ where: {
    userId: user.id,
    id: word.packId
  } })
    .then(() => {
      return models.Word.destroy({
        where: {
          id: word.id,
          packId: word.packId
        }
      })
    })
    .then((deletedRecord) => {
      if (deletedRecord === 1) {
        res.status(200).json({ word: word, status: 200 })
      } else {
        res.status(404).json({ error: 'record not found' })
      }
    })
    .catch((err) => {
      res.json({ error: err.message })
    })
}

const update = (req, res) => {
  const { body: { word } } = req

  models.Word.update(
    { original: word.original, translate: word.translate },
    { where: { id: word.id, packId: word.pack_id } }
  )
    .then(() =>
      res.status(200).json({ word: word, status: 200 })
    )
    .catch((err) => {
      res.json({ error: err.message })
    })
}

export default {
  create,
  getByPack,
  deleteWord,
  update
}
