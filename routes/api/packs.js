import passport from 'passport'
import express from 'express'

import controllers from 'controllers'

const router = express.Router()

router.post('/', passport.authenticate('jwt', { session: false }),
  controllers.packsController.create)

router.get('/', passport.authenticate('jwt', { session: false }),
  controllers.packsController.getAll)

router.delete('/', passport.authenticate('jwt', { session: false }),
  controllers.packsController.deletePack)

router.put('/', passport.authenticate('jwt', { session: false }),
  controllers.packsController.updatePack)

router.post('/add-rating', passport.authenticate('jwt', { session: false }),
  controllers.packsController.addRating)

export default router
