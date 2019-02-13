import passport from 'passport'
import express from 'express'

import auth from '../auth'
import models from '../../models'
import { getMessageError } from '../../utils/errors'

const router = express.Router()

router.post('/register', auth.optional, (req, res) => {
  const { body: { user } } = req

  models.user.findOrCreate({
    where: {
      email: user.email
    },
    defaults: {
      salt: 'salt',
      hash: user.password
    }
  }).spread((newUser, created) => {
    if (created) {
      res.json({ user: newUser.toAuthJSON() })
    } else {
      res.status(422).json({
        errors: {
          email: 'email is already taken'
        }
      })
    }
  }).catch((err) => {
    getMessageError(res, err)
  })
})

router.post('/login', auth.optional, (req, res) => {
  const { body: { user } } = req

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
  }).catch((err) => {
    getMessageError(res, err)
  })
})

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  return res.json({
    user: req.user.toAuthJSON()
  })
})

export default router
