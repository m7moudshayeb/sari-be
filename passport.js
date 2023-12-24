const passport = require('passport');
const passportJWT = require('passport-jwt');
const { ExtractJwt } = require('passport-jwt');
const Users = require('./models/users.model');

const StrategyJWT = passportJWT.Strategy;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new StrategyJWT(jwtOptions, async (jwtPayload, done) => {
    try {
      const user = await Users.findById(jwtPayload.id);

      if (user) {
        const updatedPayload = { ...jwtPayload, role: user.role };
        return done(null, updatedPayload);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  }),
);

module.exports = passport;
