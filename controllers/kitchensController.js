import models from 'models'

const getKitchens = (req, res) => {
  models.Kitchen.findAll()
    .then((kitchens) => {
      const mappedKitchens = kitchens.map((item) => item.toJSON())

      res.json({ kitchens: mappedKitchens })
    })
}

const createKitchen = (req, res) => {
  const { body: { kitchen } } = req

  models.Kitchen.create({
    title: kitchen.title
  })
    .then(() => res.json({ kitchen: kitchen, status: 200 }))
}

const updateKitchen = (req, res) => {
  const { body: { kitchen } } = req
  const newTitle = kitchen.title

  models.Kitchen.findOne({
    where: { id: kitchen.id }
  })
    .then((kitchen) => (
      kitchen.update({
        title: newTitle
      })
    ))
    .then(() => {
      res.json({ kitchen: kitchen, status: 200 })
    })
}

const deleteKitchen = (req, res) => {
  const { body: { kitchen } } = req

  models.Kitchen.findOne({
    where: { id: kitchen.id }
  })
    .then((kitchen) => (
      kitchen.destroy()
    ))
    .then(() => {
      res.json({ kitchen: kitchen, status: 200 })
    })
}

export default {
  getKitchens,
  createKitchen,
  updateKitchen,
  deleteKitchen
}
