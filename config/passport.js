const localStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const passport = require('passport')

module.exports = function(passport){
    passport.use(
        new localStrategy({usernameField: 'email'}, (email, password, done) =>{
           User.findOne({email: email})
           .then(user =>{

               if(!user){
                 //verifier l'email s'il existe
                return done(null, false, {message: "cet email n'est pas enregistrer"})
               }
               
               //verifier le mot de passe s'il existe
               bcrypt.compare(password, user.password, (err, isMatch) =>{
                if(err)console.log(err);

                if(isMatch){
                    return done(null, user)
                } else{
                    return done(null, false, {message: 'le mot de passe est incorrect'})
                }
                
               })
            })
           .catch()
        })
    )
 
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
}