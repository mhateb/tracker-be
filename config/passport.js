import passport from 'passport'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'

<<<<<<< HEAD
import models from 'models'
=======
import models from '../db/models'
>>>>>>> 9e7754b362bfd95597dec1feaac5821a3fefff45

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
