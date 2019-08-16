import express from 'express'

import catalogsRouter from './catalogs'
import kitchensRouter from './kitchens'
import dinnersRouter from './dinners'
import menuFoodsRouter from './menuFoods'
import volumesRouter from './volumes'

const router = express.Router()

router.use('/catalogs', catalogsRouter)
router.use('/kitchens', kitchensRouter)
router.use('/dinners', dinnersRouter)
router.use('/menus', menuFoodsRouter)
router.use('/volumes', volumesRouter)

export default router
