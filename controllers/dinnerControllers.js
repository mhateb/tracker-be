import models from 'models'

const getDinners = (req, res) => {
  models.Dinner.findAll()
    .then((dinners) => {
      const mappedDinners = dinners.map((item) => item.toJSON())

      res.json({ dinners: mappedDinners })
    })
}

const createDinner = (req, res) => {
  const { body: { dinner } } = req

  models.Dinner.create({
    title: dinner.title
  })
    .then(() => res.json({ dinner: dinner, status: 200 }))
}

const updateDinner = (req, res) => {
  const { body: { dinner } } = req
  const newTitle = dinner.title

  models.Dinner.findOne({
    where: { id: dinner.id }
  })
    .then((dinner) => (
      dinner.update({
        title: newTitle
      })
    ))
    .then(() => {
      res.json({ dinner: dinner, status: 200 })
    })
}

const deleteDinner = (req, res) => {
  const { body: { dinner } } = req

  models.Dinner.findOne({
    where: { id: dinner.id }
  })
    .then((dinner) => (
      dinner.destroy()
    ))
    .then(() => {
      res.json({ dinner: dinner, status: 200 })
    })
}

export default {
  getDinners,
  createDinner,
  updateDinner,
  deleteDinner
}
