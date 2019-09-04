import passport from 'passport'
import express from 'express'

import controllers from 'controllers'

const router = express.Router()

router.get('/', passport.authenticate('jwt', { session: false }), controllers.menuFoodsController.getMenuFoods)

router.post('/', passport.authenticate('jwt', { session: false }), controllers.menuFoodsController.createMenuFood)

router.put('/', passport.authenticate('jwt', { session: false }), controllers.menuFoodsController.updateMenuFood)

router.delete('/', passport.authenticate('jwt', { session: false }), controllers.menuFoodsController.deleteMenuFood)

export default router
