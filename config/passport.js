import passport from 'passport'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'

import models from '../db/models'

const jwtOptions = {}

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKey = 'SECRET_KEY'

passport.use(new JwtStrategy(jwtOptions, function (jwtPayload, next) {
  console.log('payload received', jwtPayload)
  models.User.findById(jwtPayload.id)
    .then(user => {
      if (user) {
        next(null, user)
      } else {
        next(null, false)
      }
    })
}))
