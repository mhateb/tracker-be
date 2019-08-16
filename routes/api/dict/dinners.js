import passport from 'passport'
import express from 'express'

import controllers from 'controllers'

const router = express.Router()

router.get('/', passport.authenticate('jwt', { session: false }), controllers.dinnersController.getDinners)

router.post('/', passport.authenticate('jwt', { session: false }), controllers.dinnersController.createDinner)

router.put('/', passport.authenticate('jwt', { session: false }), controllers.dinnersController.updateDinner)

router.delete('/', passport.authenticate('jwt', { session: false }), controllers.dinnersController.deleteDinner)

export default router
