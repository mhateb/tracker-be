import passport from 'passport'
import express from 'express'

import controllers from 'controllers'

import models from '../../db/models'
import { getMessageError } from '../../utils/errors'

const router = express.Router()

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { body: { pack } } = req

  models.Recipe.findOrCreate({
    where: {
      title: pack.title,
      userId: req.user.id
    },
    defaults: {
      trueAnswers: 0,
      falseAnswers: 0,
      rating: 0
    }
  })
    .then(([newPack, created]) => {
      if (created) {
        res.json({ pack: newPack.toJSON() })
      } else {
        res.status(422).json({
          errors: {
            email: 'pack is already taken'
          }
        })
      }
    })
    .catch((err) => {
      getMessageError(res, err)
    })
})

router.get('/', passport.authenticate('jwt', { session: false }), controllers.recipesController.getAllRecipes)

router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { body: { pack } } = req

  models.Recipe.destroy({
    where: {
      id: pack.id,
      userId: req.user.id
    }
  })
    .then((deletedRecord) => {
      if (deletedRecord === 1) {
        res.status(200).json({ message: 'Deleted successfully' })
      } else {
        res.status(404).json({ message: 'record not found' })
      }
    })
    .catch((err) => {
      getMessageError(res, err)
    })
})

router.put('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { body: { pack } } = req

  models.Recipe.update(
    { title: pack.title },
    { where: { id: pack.id, userId: req.user.id } }
  )
    .then(() =>
      res.status(200).json({ message: 'pack was updated' })
    )
    .catch((err) => {
      getMessageError(res, err)
    })
})

export default router
