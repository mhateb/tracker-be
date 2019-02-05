import passport from 'passport'
import express from 'express'

import auth from '../auth'
import models from '../../models'

const router = express.Router()

router.post('/', auth.optional, (req, res) => {
  const { body: { user } } = req

  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required'
      }
    })
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required'
      }
    })
  }

  models.user.findOrCreate({
    where: {
      email: user.email
    },
    defaults: {
      salt: 'salt',
      hash: user.password
    }
  })
    .spread(function (newUser, created) {
      if (created) {
        res.json({ user: newUser.toAuthJSON() })
      } else {
        res.status(422).json({
          errors: {
            email: 'email is already taken'
          }
        })
      }
    })
})

router.post('/login', auth.optional, (req, res, next) => {
  const { body: { user } } = req

  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required'
      }
    })
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required'
      }
    })
  }

  return passport.authenticate('local', { session: false }, (err, passportUser) => {
    if (err) {
      return next(err)
    }

    if (passportUser) {
      const user = passportUser
      user.token = passportUser.generateJWT()

      return res.json({ user: user.toAuthJSON() })
    }

    return status(400).info
  })(req, res, next)
})

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  return res.json({
    user: req.user.toAuthJSON()
  })
})

router.get('/secret', passport.authenticate('jwt', { session: false }), function (req, res) {
  res.json({ message: 'Success! You can not see this without a token' })
})

router.get('/test', function (req, res) {
  return res.json({
    test: 'test'
  })
})

export default router
