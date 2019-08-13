import express from 'express'

import usersRouter from './users'
import recipesRouter from './recipes'
import dictRouter from './dict'

const router = express.Router()

router.use('/users', usersRouter)
router.use('/recipes', recipesRouter)
router.use('/dict', dictRouter)

export default router
