import models from 'models'

const getAllRecipes = (req, res) => {
  models.Recipe.findAll()
    .then((recipes) => {
      const mappingRecipes = recipes.map((item) => item.toJSON())

      res.json({ recipes: mappingRecipes })
    })
}

const createNewRecipe = (req, res) => {
  const { body: { recipe } } = req

  models.Recipe.create({
    ...recipe
  })
    .then((newRecipe) => {
      res.json({ recipe: newRecipe, status: 200 })
    })
    .catch((e) => {
      res.json({ error: e })
    })
}

const findRecipes = (req, res) => {
  const { body: { params } } = req

  models.Recipe.findAll({ where: { ...params } })
    .then((recipes) => {
      res.json({ recipes })
    })
    .catch((e) => {
      res.json({ error: e })
    })
}

const updateRecipe = (req, res) => {
  const { body: { recipe } } = req
  const { id } = recipe

  models.Recipe.findOne({
    where: { id: id }
  })
    .then((foundRecipe) => (
      foundRecipe.update({
        ...recipe,
        id
      })
    ))
    .then((updatedRecipe) => {
      res.json({ recipe: updatedRecipe, status: 200 })
    })
    .catch((err) => res.json({ error: err }))
}

const deleteRecipe = (req, res) => {
  const { body: { recipe } } = req

  models.MenuFood.findOne({
    where: { id: recipe.id }
  })
    .then((foundRecipe) => (
      foundRecipe.destroy()
    ))
    .then(() => {
      res.json({ status: 200 })
    })
    .catch((err) => res.json({ error: err }))
}

export default {
  getAllRecipes,
  createNewRecipe,
  updateRecipe,
  deleteRecipe,
  findRecipes
}
