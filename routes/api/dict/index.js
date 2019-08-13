import express from 'express'

import catalogsRouter from './catalogs'
import kitchensRouter from './kitchens'

const router = express.Router()

router.use('/catalogs', catalogsRouter)
router.use('/kitchens', kitchensRouter)

export default router
