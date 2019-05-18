import passport from 'passport'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'

import models from '../models'

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'SECRET_KEY'
}

passport.use(new JwtStrategy(jwtOptions, function (jwtPayload, next) {
  console.log('payload received', jwtPayload)
  models.user.findById(jwtPayload.id)
    .then(user => {
      if (user) {
        next(null, user)
      } else {
        next(null, false)
      }
    })
}))
