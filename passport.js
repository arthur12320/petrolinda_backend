const passport = require('passport');

const jwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const localStrategy = require('passport-local').Strategy;


const JWT_SECRET = '3213131vvvd\sfdfbgb gbz';




// !!!!! convert strategy to mysql !!!!!!!
//JSON web tokens strategy
//sedn jwt in authorization header
passport.use(new jwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: JWT_SECRET
}, async (payload, done) => {
  try {
    //find user on the token 
    const user = await User.findById(payload.sub);

    //if user doesnt exist deal with it 
    if (!user) {
      return done(null, false);
    }

    //otherwise return the user
    done(null, user);

  } catch (err) {
    done(err, false);
  }
}));



// !!!!! convert strategy to mysql !!!!!!!
//local strategy
passport.use(new localStrategy(
  async (username, password, done) => {
    try {
      //find the user with the username
      const user = await User.findOne({ username });

      //if not handle it 
      if (!user) {
        return done(null, false);
      }

      //check if passsword is correct
      const isMatch = await user.isValidPassword(password);
      //if not handle it 
      if (!isMatch) {
        return done(null, false);
      }

      //return the user
      done(null, user);

    } catch (err) {
      done(err, false);
    }

  }))
