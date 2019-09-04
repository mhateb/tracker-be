import models from 'models'

const getMenuFoods = (req, res) => {
  models.MenuFood.findAll()
    .then((menuFoods) => {
      const mappedMenuFoods = menuFoods.map((item) => item.toJSON())

      res.json({ menus: mappedMenuFoods })
    })
}

const createMenuFood = (req, res) => {
  const { body: { menu } } = req

  models.MenuFood.create({
    title: menu.title
  })
    .then(() => res.json({ menu: menu, status: 200 }))
}

const updateMenuFood = (req, res) => {
  const { body: { menu } } = req
  const newTitle = menu.title

  models.MenuFood.findOne({
    where: { id: menu.id }
  })
    .then((menu) => (
      menu.update({
        title: newTitle
      })
    ))
    .then(() => {
      res.json({ menu: menu, status: 200 })
    })
}

const deleteMenuFood = (req, res) => {
  const { body: { menu } } = req

  models.MenuFood.findOne({
    where: { id: menu.id }
  })
    .then((menu) => (
      menu.destroy()
    ))
    .then(() => {
      res.json({ menu: menu, status: 200 })
    })
}

export default {
  getMenuFoods,
  createMenuFood,
  updateMenuFood,
  deleteMenuFood
}
