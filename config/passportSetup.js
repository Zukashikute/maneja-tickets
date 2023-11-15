const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const env = require('dotenv').config();
const db = require('../models');
const GoogleUser = db.googleUsers;

passport.serializeUser((user, done) => {
done(null, user.id)
})

passport.deserializeUser((id, done) => {
    GoogleUser.findById(id).then((user) => {
    done(null, user)    
    })
})

passport.use(new GoogleStrategy ({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/redirect'    
}, (req, accessToken, refreshToken, profile, done) => {
   // check if user already exists in our db
   GoogleUser.findOne({googleId: profile.id}).then((currentUser) => {
   if(currentUser){
   console.log('User is: ' + currentUser)
   done(null, currentUser)
   } else {
     new GoogleUser({
        username: profile.displayName,
        googleId: profile.id
     }).save().then((newUser) => {
     console.log('New user created: ' + newUser)
     done(null, newUser)   
     })
   } 
   }) 
}));