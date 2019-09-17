import passport from 'passport'
import express from 'express'

import controllers from 'controllers'
import auth from '../auth'

const router = express.Router()

router.post('/register', auth.optional,
  controllers.usersController.registerUser)

router.post('/login', auth.optional,
  controllers.usersController.loginUser)

router.get('/current', passport.authenticate('jwt', { session: false }),
  controllers.usersController.getCurrentUser)

export default router
