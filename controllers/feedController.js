import models from 'models'

const getAll = (req, res) => {
  models.Pack.findAll({ where: { isFeed: true } })
    .then((packs) => {
      res.json({ packs })
    })
    .catch((err) => {
      res.json({ error: err })
    })
}

const addFeedPack = (req, res) => {
  const { user, body: { packId } } = req

  let newPackId = null

  models.Pack.findOne({
    where: {
      id: packId
    }
  })
    .then((foundPack) => {
      delete foundPack.dataValues.id
      return models.Pack.create({
        ...foundPack.dataValues,
        userId: user.id
      })
    })
    .then((newPack) => {
      newPackId = newPack.id

      return models.Word.findAll({
        where: {
          packId: packId
        }
      })
    })
    .then((foundWords) => {
      foundWords.forEach(item => {
        delete item.dataValues.id
        models.Word.create({
          ...item.dataValues,
          packId: newPackId
        })
      })
    })
    .then(() => {
      res.json({ status: 200 })
    })
    .catch((err) => res.json({ error: err }))
}

export default {
  getAll,
  addFeedPack
}
