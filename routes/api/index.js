import express from 'express'

import usersRouter from './users'
<<<<<<< HEAD
import packsRouter from './packs'
import wordsRouter from './words'
import feedRouter from './feed'
=======
import recipesRouter from './recipes'
import dictRouter from './dict'
import ingridientRouter from './ingridient'
>>>>>>> 9e7754b362bfd95597dec1feaac5821a3fefff45

const router = express.Router()

router.use('/users', usersRouter)
<<<<<<< HEAD
router.use('/packs', packsRouter)
router.use('/words', wordsRouter)
router.use('/feed', feedRouter)
=======
router.use('/recipes', recipesRouter)
router.use('/dict', dictRouter)
router.use('/ings', ingridientRouter)
>>>>>>> 9e7754b362bfd95597dec1feaac5821a3fefff45

export default router
