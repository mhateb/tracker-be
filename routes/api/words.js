import passport from 'passport'
import express from 'express'

import controllers from 'controllers'

const router = express.Router()

router.post('/', passport.authenticate('jwt', { session: false }),
  controllers.wordsController.create)

router.get('/', passport.authenticate('jwt', { session: false }),
  controllers.wordsController.getByPack)

router.delete('/', passport.authenticate('jwt', { session: false }),
  controllers.wordsController.deleteWord)

router.put('/', passport.authenticate('jwt', { session: false }),
  controllers.wordsController.update)

export default router
