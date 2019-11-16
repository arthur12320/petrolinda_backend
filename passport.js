const passport = require('passport');

const jwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const localStrategy = require('passport-local').Strategy;

const User = require('./db/commands');
const util = require('./utilites/cripto');

const JWT_SECRET = '3213131vvvd\sfdfbgb gbz';


// cmmand to create user:
// INSERT INTO `PetroLinda`.`usuario` (`login`, `senha`, `pessoa_cpf`, `posto_razao_social`) VALUES ('deb', '123', '2', 'posto1');

// !!!!! convert strategy to mysql !!!!!!!
//JSON web tokens strategy
//sedn jwt in authorization header
passport.use(new jwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: JWT_SECRET
}, async (payload, done) => {
  //find user on the token 
  User.findLogin(payload.sub, user => {
    //if user doesnt exist deal with it 
    if (!user) {
      return done(null, false);
    }
    //otherwise return the user
    done(null, user);
  });
}));



//local strategy //done
passport.use(new localStrategy({
  usernameField: 'login',
  passwordField: 'senha'
}, async (login, senha, done) => {
  //find the user with the username
  User.findLogin(login, user => {
    console.log(user);
    //if not handle it 
    if (!user) {
      return done(null, false);
    }

    //check if passsword is correct
    const isMatch = util.compare(user.senha, senha);
    //if not handle it 
    if (!isMatch) {
      return done(null, false);
    }

    //return the user
    done(null, user);
  })

}))
