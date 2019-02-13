import passport from 'passport'
import express from 'express'

import auth from '../auth'
import models from '../../models'

const router = express.Router()

router.post('/register', auth.optional, (req, res) => {
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
  }).spread(function (newUser, created) {
    if (created) {
      res.json({ user: newUser.toAuthJSON() })
    } else {
      res.status(422).json({
        errors: {
          email: 'email is already taken'
        }
      })
    }
  }).catch(function (err) {
    res.json({ err: err.errors.map(function (e) {
      return e.message
    }) })
  })
})

router.post('/login', auth.optional, (req, res) => {
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

  models.user.findOne({
    where: {
      email: user.email
    }
  }).then(foundUser => {
    if (foundUser == null) {
      res.status(401).json({ message: 'no such user found' })
    } else {
      foundUser.validatePassword(user.password)
        ? res.status(200).json({ user: foundUser.toAuthJSON() })
        : res.status(401).json({ message: 'passwords did not match' })
    }
  }).catch(function (err) {
    res.json({ err: err.errors.map(function (e) {
      return e.message
    }) })
  })
})

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  return res.json({
    user: req.user.toAuthJSON()
  })
})

export default router
