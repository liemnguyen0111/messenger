// Passport dependencies
const passport = require('passport')
const { Strategy } = require('passport-local')
const { Strategy : JWTStrategy, ExtractJwt } = require('passport-jwt')
const { User } = require('../models')

passport.use(new Strategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser((User.deserializeUser()))

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET
}, ({ id }, cb) => User.findById(id)
  .then(user => cb(null, user))
  .catch(err => cb(err))))

module.exports.passport = passport