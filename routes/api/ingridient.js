import passport from 'passport'
import express from 'express'

import controllers from 'controllers'

const router = express.Router()

router.post('/', passport.authenticate('jwt', { session: false }), controllers.ingridientsController.createIngridient)

router.get('/', passport.authenticate('jwt', { session: false }), controllers.ingridientsController.getIngridients)

router.delete('/', passport.authenticate('jwt', { session: false }), controllers.ingridientsController.deleteIngridient)

router.put('/', passport.authenticate('jwt', { session: false }), controllers.ingridientsController.updateIngridient)

export default router
