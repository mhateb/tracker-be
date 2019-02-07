import express from 'express'

import usersRouter from './users'
import packsRouter from './packs'

const router = express.Router()

router.use('/users', usersRouter)
router.use('/packs', packsRouter)

export default router
