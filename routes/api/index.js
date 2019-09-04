import express from 'express'

import usersRouter from './users'
import recipesRouter from './recipes'
import dictRouter from './dict'
import ingridientRouter from './ingridient'

const router = express.Router()

router.use('/users', usersRouter)
router.use('/recipes', recipesRouter)
router.use('/dict', dictRouter)
router.use('/ings', ingridientRouter)

export default router
