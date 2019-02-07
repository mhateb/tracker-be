import express from 'express'

import usersRouter from './users'
import packsRouter from './packs'
import wordsRouter from './words'

const router = express.Router()

router.use('/users', usersRouter)
router.use('/packs', packsRouter)
router.use('/words', wordsRouter)

export default router
