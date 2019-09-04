import models from 'models'

const create = (req, res) => {
  const { user, body: { pack } } = req

  models.Pack.create({
    ...pack,
    userId: user.id,
    trueAnswers: 0,
    falseAnswers: 0,
    rating: 0,
    isFeed: pack.isFeed || false
  })
    .then((newPack) => {
      res.json({ pack: newPack, status: 200 })
    })
    .catch((err) => {
      res.json({ error: err })
    })
}

const getAll = (req, res) => {
  const { user } = req

  models.Pack.findAll({
    where: {
      userId: user.id
    }
  })
    .then(packs => {
      res.json({
        packs: packs
      })
    })
    .catch((err) => {
      res.json({ error: err })
    })
}

const deletePack = (req, res) => {
  const { body: { pack } } = req

  models.Pack.destroy({
    where: {
      id: pack.id,
      userId: req.user.id
    }
  })
    .then((deletedRecord) => {
      if (deletedRecord === 1) {
        res.status(200).json({ pack: pack, status: 200 })
      } else {
        res.status(404).json({ message: 'Record not found' })
      }
    })
    .catch((err) => {
      res.json({ error: err })
    })
}

const updatePack = (req, res) => {
  const { user, body: { pack } } = req

  models.Pack.update(
    { ...pack },
    { where: { id: pack.id, userId: user.id } }
  )
    .then(() =>
      models.Pack.findOne({ where: { id: pack.id } })
    )
    .then((foundPack) => {
      res.status(200).json({ pack: foundPack, status: 200 })
    })
    .catch((err) => {
      res.json({ error: err })
    })
}

const addRating = (req, res) => {
  const { body: { pack } } = req

  models.Pack.findOne({
    where: { id: pack.id }
  })
    .then((foundPack) => (
      foundPack.update({
        trueAnswers: foundPack.trueAnswers + pack.trueAnswers,
        falseAnswers: foundPack.falseAnswers + pack.falseAnswers,
        rating: ((foundPack.trueAnswers + pack.trueAnswers) /
            (foundPack.trueAnswers + foundPack.falseAnswers + pack.trueAnswers + pack.falseAnswers))
      })
    ))
    .then((updatedPack) => {
      res.json({ pack: updatedPack, status: 200 })
    })
    .catch((err) => res.json({ error: err }))
}

export default {
  create,
  getAll,
  deletePack,
  updatePack,
  addRating
}
