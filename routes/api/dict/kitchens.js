import passport from 'passport'
import express from 'express'

import controllers from 'controllers'

const router = express.Router()

router.get('/', passport.authenticate('jwt', { session: false }), controllers.kitchensController.getKitchens)

router.post('/', passport.authenticate('jwt', { session: false }), controllers.kitchensController.createKitchen)

router.put('/', passport.authenticate('jwt', { session: false }), controllers.kitchensController.updateKitchen)

router.delete('/', passport.authenticate('jwt', { session: false }), controllers.kitchensController.deleteKitchen)

export default router
