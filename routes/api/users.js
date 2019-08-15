import passport from 'passport'
import express from 'express'

import auth from '../auth'
import models from '../../db/models'
import { getMessageError } from '../../utils/errors'

const router = express.Router()

router.post('/register', auth.optional, (req, res) => {
  const { body: { user } } = req

  console.log(req.body)

  models.User.findOrCreate({
    where: {
      email: user.email
    },
    defaults: {
      username: user.username,
      salt: 'salt',
      hash: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      about: 'about hahahah'
    }
  })
    .then(([newUser, created]) => {
      if (created) {
        res.json({ user: newUser.toJSON() })
      } else {
        res.status(422).json({
          errors: {
            email: 'email is already taken'
          }
        })
      }
    })
    .catch((err) => {
      console.log(err)
      getMessageError(res, err)
    })
})

router.post('/login', auth.optional, (req, res) => {
  const { body: { user } } = req

  models.User.findOne({
    where: {
      email: user.email
    }
  })
    .then(foundUser => {
      if (foundUser == null) {
        res.status(401).json({ message: 'no such user found' })
      } else {
        foundUser.validatePassword(user.password)
          ? res.status(200).json({ user: foundUser.toJSON() })
          : res.status(401).json({ message: 'passwords did not match' })
      }
    })
    .catch((err) => {
      getMessageError(res, err)
    })
})

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  return res.json({
    user: req.user.toJSON()
  })
})

export default router
