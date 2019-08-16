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
    .then(() => res.json({ recipe: recipe, status: 200 }))
}

export default {
  getAllRecipes,
  createNewRecipe
}
