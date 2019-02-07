import passport from 'passport'
import express from 'express'

import models from '../../models'

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

  models.pack.findOrCreate({
    where: {
      title: pack.title,
      fk_user_id: req.user.id
    }
  })
    .spread(function (newPack, created) {
      if (created) {
        res.json({ pack: newPack.toAuthJSON() })
      } else {
        res.status(422).json({
          errors: {
            email: 'pack is already taken'
          }
        })
      }
    })
})

router.get('/all', passport.authenticate('jwt', { session: false }), (req, res) => {
  models.pack.findAll({
    where: {
      fk_user_id: req.user.id
    }
  })
    .then(packs => {
      res.json({
        packs: packs
      })
    })
    .catch(function (error) {
      res.status(500).json(error)
    })
})

router.post('/delete', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { body: { pack } } = req

  models.pack.destroy({
    where: {
      title: pack.title,
      fk_user_id: req.user.id
    }
  })
    .then(function (deletedRecord) {
      if (deletedRecord === 1) {
        res.status(200).json({ message: 'Deleted successfully' })
      } else {
        res.status(404).json({ message: 'record not found' })
      }
    })
    .catch(function (error) {
      res.status(500).json(error)
    })
})

router.post('/update', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { body: { pack } } = req

  models.pack.update(
    { title: pack.title },
    { where: { id: pack.id, fk_user_id: req.user.id } }
  )
    .then(result =>
      res.status(200).json({ message: 'pack was updated' })
    )
    .catch(err =>
      res.status(500).json(err)
    )
})

export default router
