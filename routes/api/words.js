import passport from 'passport'
import express from 'express'

import models from '../../models'

const router = express.Router()

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { body: { word } } = req

  if (!word.original) {
    return res.status(422).json({
      errors: {
        original: 'is required'
      }
    })
  }

  if (!word.translate) {
    return res.status(422).json({
      errors: {
        translate: 'is required'
      }
    })
  }

  if (!word.pack_id) {
    return res.status(422).json({
      errors: {
        pack_id: 'is required'
      }
    })
  }

  models.word.findOrCreate({
    where: {
      original: word.original,
      translate: word.translate,
      fk_pack_id: word.pack_id
    }
  })
    .spread(function (newWord, created) {
      if (created) {
        res.json({ word: newWord.toAuthJSON() })
      } else {
        res.status(422).json({
          errors: {
            word: 'is already taken'
          }
        })
      }
    })
})

router.get('/all', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { body: { pack } } = req

  models.word.findAll({
    where: {
      fk_pack_id: pack.id
    }
  })
    .then(words => {
      res.json({
        words: words
      })
    })
    .catch(function (error) {
      res.status(500).json(error)
    })
})

router.post('/delete', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { body: { word } } = req

  models.word.destroy({
    where: {
      id: word.id,
      fk_pack_id: word.pack_id
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
  const { body: { word } } = req

  models.word.update(
    { original: word.original, translate: word.translate },
    { where: { id: word.id, fk_pack_id: word.pack_id } }
  )
    .then(result =>
      res.status(200).json({ message: 'word was updated' })
    )
    .catch(err =>
      res.status(500).json(err)
    )
})

export default router
