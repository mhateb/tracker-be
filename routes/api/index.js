import express from 'express'

import usersRouter from './users'
import packsRouter from './packs'
import wordsRouter from './words'
import feedRouter from './feed'

const router = express.Router()

router.use('/users', usersRouter)
router.use('/packs', packsRouter)
router.use('/words', wordsRouter)
router.use('/feed', feedRouter)

export default router
