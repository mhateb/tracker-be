import Sequelize from 'sequelize'

import User from './user'
import Recipe from './recipe'
import IngridientRecipes from './ingridient-recipes'
import Ingridient from './ingridient'
import RecipeComment from './recipe_comment'
import StepRecipeInstruction from './step_recipe_instruction'
import Catalog from './dict/catalog'
import Kitchen from './dict/kitchen'
import Menu from './dict/menuFood'
import Dinner from './dict/dinner'
import Volume from './dict/volume'

import configJSON from '../../config/config'

const env = process.env.NODE_ENV || 'development'
const config = configJSON[env]
const sequelize = new Sequelize(config.database, config.username, config.password, config)

const models = {
  MenuFood: Menu.init(sequelize, Sequelize),
  Catalog: Catalog.init(sequelize, Sequelize),
  Kitchen: Kitchen.init(sequelize, Sequelize),
  Dinner: Dinner.init(sequelize, Sequelize),
  Volume: Volume.init(sequelize, Sequelize),
  User: User.init(sequelize, Sequelize),
  Recipe: Recipe.init(sequelize, Sequelize),
  Ingridient: Ingridient.init(sequelize, Sequelize),
  IngridientRecipes: IngridientRecipes.init(sequelize, Sequelize),
  RecipeComment: RecipeComment.init(sequelize, Sequelize),
  StepRecipeInstruction: StepRecipeInstruction.init(sequelize, Sequelize)
}

Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models))

const db = {
  ...models,
  sequelize
}

export default db
