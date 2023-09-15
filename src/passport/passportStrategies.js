import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GithubStrategy } from 'passport-github2';
import { usersManager } from '../dao/managers/UserManagerMongo.js';
import { compareData } from '../utils.js';

passport.use('login', new LocalStrategy(
    async function (username, password, done) {
        try {
            const userDB = await usersManager.findUser(username)
            if (!userDB) {
                return done(null, false)
            }
            const passwordIncorrect = await compareData(password, userDB.password)
            if (!passwordIncorrect) {
                return done(null, false);
            }
            return done(null, userDB);
        } catch (error) {
            done(error)
        }
    }
))

passport.use(new GithubStrategy({
    clientID: 'Iv1.6d4b33b86dda9050',
    clientSecret: '314699c047a2fed9643c462bd96e5a1edd23d26b',
    callbackURL: 'http://localhost:8080/api/auth/github'
  },
  async function(accessToken, refreshToken, profile, done) {
    try {
        const userDB = await usersManager.findUser(profile.username)
        if(userDB){
            if(userDB.fromGithub){
                return done(null,userDB)
            } else {
                return done(null,false)
            }
        }
        const newUser = {
            first_name: profile.displayName.split(' ') [0],
            last_name: profile.displayName.split(' ') [1],
            username: profile.username,
            password: ' ',
            email: profile.emails[0].value,
            fromGithub: true
        }
        const result = await usersManager.createUser(newUser)
        return done(null,result)
    } catch (error) {
        done(error)
    }
  }
))




passport.serializeUser((usuario, done) => {
    done(null, usuario._id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await usersManager.findUserById(id)
        done(null, user)

    } catch (error) {
        done(error)
    }
})