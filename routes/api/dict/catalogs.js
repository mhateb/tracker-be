import passport from 'passport'
import express from 'express'

import controllers from 'controllers'

const router = express.Router()

router.get('/', passport.authenticate('jwt', { session: false }), controllers.catalogsController.getCatalogs)

router.post('/', passport.authenticate('jwt', { session: false }), controllers.catalogsController.createCatalog)

router.put('/', passport.authenticate('jwt', { session: false }), controllers.catalogsController.updateCatalog)

router.delete('/', passport.authenticate('jwt', { session: false }), controllers.catalogsController.deleteCatalog)

export default router
