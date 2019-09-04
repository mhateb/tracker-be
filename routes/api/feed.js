import passport from 'passport'
import express from 'express'

import controllers from 'controllers'

const router = express.Router()

router.get('/', passport.authenticate('jwt', { session: false }),
  controllers.feedController.getAll)

router.post('/add', passport.authenticate('jwt', { session: false }),
  controllers.feedController.addFeedPack)

export default router
