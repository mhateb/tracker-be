import passport from 'passport';
import {ExtractJwt, Strategy as JwtStrategy} from 'passport-jwt';

import models from '../models'

const jwtOptions = {}

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'SECRET_KEY';

passport.use(new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('payload received', jwt_payload);
    models.user.findById(jwt_payload.id)
        .then(user => {
            if (user) {
                next(null, user);
            } else {
                next(null, false);
            }
        })
}));