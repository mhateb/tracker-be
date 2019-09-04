import models from 'models'

const getIngridients = (req, res) => {
  models.Ingridient.findAll()
    .then((ingridients) => {
      const mappedIngridients = ingridients.map((item) => item.toJSON())

      res.json({ ingridients: mappedIngridients })
    })
    .catch((e) => res.json({ error: e }))
}

const createIngridient = (req, res) => {
  const { body: { ingridient } } = req

  models.Ingridient.create({
    ...ingridient
  })
    .then(() => res.json({ ingridient: ingridient, status: 200 }))
    .catch((e) => res.json({ error: e }))
}

const updateIngridient = (req, res) => {
  const { body: { ingridient } } = req

  models.Ingridient.findOne({
    where: { id: ingridient.id }
  })
    .then((foundIngridient) => (
      ingridient.update({
        ...ingridient,
        id: foundIngridient.id
      })
    ))
    .then(() => {
      res.json({ ingridient: ingridient, status: 200 })
    })
    .catch((e) => res.json({ error: e }))
}

const deleteIngridient = (req, res) => {
  const { body: { ingridient } } = req

  models.Kitchen.findOne({
    where: { id: ingridient.id }
  })
    .then((foundIngridient) => (
      foundIngridient.destroy()
    ))
    .then(() => {
      res.json({ ingridient: ingridient, status: 200 })
    })
    .catch((e) => res.json({ error: e }))
}

export default {
  getIngridients,
  createIngridient,
  updateIngridient,
  deleteIngridient
}
