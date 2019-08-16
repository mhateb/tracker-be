import passport from 'passport'
import express from 'express'

import auth from '../auth'
import controllers from 'controllers'

const router = express.Router()

router.post('/register', auth.optional, controllers.usersController.registerUser)

router.post('/login', auth.optional, controllers.usersController.loginUser)

router.get('/current', passport.authenticate('jwt', { session: false }), controllers.usersController.getCurrentUser)

export default router
