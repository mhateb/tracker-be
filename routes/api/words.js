import passport from 'passport'
import express from 'express'

import models from '../../models'
import { getMessageError } from '../../utils/errors'

const router = express.Router()

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { body: { word } } = req

  models.Word.findOrCreate({
    where: {
      original: word.original,
      translate: word.translate,
      fk_pack_id: word.pack_id
    }
  })
    .spread((newWord, created) => {
      if (created) {
        res.json({ word: newWord.toJSON() })
      } else {
        res.status(422).json({
          errors: {
            word: 'is already taken'
          }
        })
      }
    })
    .catch((err) => {
      getMessageError(res, err)
    })
})

router.get('/all', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { body: { pack } } = req

  models.Word.findAll({
    where: {
      fk_pack_id: pack.id
    }
  })
    .then(words => {
      res.json({
        words: words
      })
    })
    .catch(function (err) {
      getMessageError(res, err)
    })
})

router.post('/delete', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { body: { word } } = req

  models.Word.destroy({
    where: {
      id: word.id,
      fk_pack_id: word.pack_id
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
  const { body: { word } } = req

  models.Word.update(
    { original: word.original, translate: word.translate },
    { where: { id: word.id, fk_pack_id: word.pack_id } }
  )
    .then(result =>
      res.status(200).json({ message: 'word was updated' })
    )
    .catch((err) => {
      getMessageError(res, err)
    })
})

export default router
