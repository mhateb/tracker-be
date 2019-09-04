import passport from 'passport'
import express from 'express'

import controllers from 'controllers'
import auth from '../auth'
<<<<<<< HEAD

const router = express.Router()

router.post('/register', auth.optional,
  controllers.usersController.registerUser)

router.post('/login', auth.optional,
  controllers.usersController.loginUser)

router.get('/current', passport.authenticate('jwt', { session: false }),
  controllers.usersController.getCurrentUser)
=======
import controllers from 'controllers'

const router = express.Router()

router.post('/register', auth.optional, controllers.usersController.registerUser)

router.post('/login', auth.optional, controllers.usersController.loginUser)

router.get('/current', passport.authenticate('jwt', { session: false }), controllers.usersController.getCurrentUser)
>>>>>>> 9e7754b362bfd95597dec1feaac5821a3fefff45

export default router
