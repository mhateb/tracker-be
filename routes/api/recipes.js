import passport from 'passport'
import express from 'express'

import controllers from 'controllers'

const router = express.Router()

router.post('/', passport.authenticate('jwt', { session: false }), controllers.recipesController.createNewRecipe)

router.get('/', passport.authenticate('jwt', { session: false }), controllers.recipesController.getAllRecipes)

router.post('/find', passport.authenticate('jwt', { session: false }), controllers.recipesController.findRecipes)

router.delete('/', passport.authenticate('jwt', { session: false }), controllers.recipesController.deleteRecipe)

router.put('/', passport.authenticate('jwt', { session: false }), controllers.recipesController.updateRecipe)

export default router
