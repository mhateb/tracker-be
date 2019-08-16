import passport from 'passport'
import express from 'express'

import controllers from 'controllers'

const router = express.Router()

router.get('/', passport.authenticate('jwt', { session: false }), controllers.volumesController.getVolumes)

router.post('/', passport.authenticate('jwt', { session: false }), controllers.volumesController.createVolume)

router.put('/', passport.authenticate('jwt', { session: false }), controllers.volumesController.updateVolume)

router.delete('/', passport.authenticate('jwt', { session: false }), controllers.volumesController.deleteVolume)

export default router
