import passport from 'passport'
import express from 'express'

import models from '../../models'
import { getMessageError } from '../../utils/errors'

const router = express.Router()

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { body: { pack } } = req

  if (!pack.title) {
    return res.status(422).json({
      errors: {
        title: 'is required'
      }
    })
  }

  models.Pack.findOrCreate({
    where: {
      title: pack.title,
      fk_user_id: req.user.id
    }
  })
    .spread((newPack, created) => {
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

router.get('/all', passport.authenticate('jwt', { session: false }), (req, res) => {
  models.Pack.findAll({
    where: {
      fk_user_id: req.user.id
    }
  })
    .then(packs => {
      res.json({
        packs: packs
      })
    })
    .catch((err) => {
      getMessageError(res, err)
    })
})

router.post('/delete', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { body: { pack } } = req

  models.Pack.destroy({
    where: {
      id: pack.id,
      fk_user_id: req.user.id
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

router.post('/update', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { body: { pack } } = req

  models.Pack.update(
    { title: pack.title },
    { where: { id: pack.id, fk_user_id: req.user.id } }
  )
    .then(result =>
      res.status(200).json({ message: 'pack was updated' })
    )
    .catch((err) => {
      getMessageError(res, err)
    })
})

export default router
