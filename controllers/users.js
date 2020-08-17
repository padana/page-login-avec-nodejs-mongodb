const User = require('../models/User')
const bcrypt = require('bcrypt')
const passport = require('passport')

const getLogin = (req, res) =>{
    res.render('login')
}

const getRegister = (req, res) =>{
    res.render('register')
}
const postRegister = (req, res) =>{
    console.log(req.body);
    const {name, email, password, password2} = req.body

    let errors = []

    
// verifier les données entres ou pas
    if(!name || !email  || !password || !password2){
        errors.push({msg: 'veuillez remplir la formulaire'})
    }


     
// verification du mot de passe
    if(password !== password2){
        errors.push({msg: 'les deux mots de passe sont pas identique'})
    }
    


//verification de la longueur du mot de passe 
    if(password.length < 6){
        errors.push({msg: 'le mot de passe doit contenir 6 caracteres'})
    }


// s'il y'a erreur
   if(errors.length > 0){
       res.render('register',  {errors, name, email, password, password2} )

    } 

    else{
        
        // analyser si l'email deja dans notre de base de donnees
        User.findOne({email: email})
        .then(user =>{
           if(user) {
                errors.push({msg: "l'email existe déja"})
                res.render('register', {errors, name, email, password, password2} )
           } 
           // Si y'a pas d'erreur, je sauvegarde le formulaire
            else{
              const newsUser = new User({
                 name,
                 email,
                 password
              })
              console.log(newsUser);
              


              // hash password
              bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(newsUser.password, salt, function(err, hash) {
                    if(err)console.log(err);
                    
                    newsUser.password = hash

                    //sauvegarder tout mon document
                    newsUser.save()
                    .then(user => {
                        req.flash('success_msg', 'Vous etes maintenant enregistrer')
                        res.redirect('/users/login')
                    })
                    .catch(err => console.log(err))

                });
            });
           }

        })
        .catch()
    }
    
}


 //identifiant de connexion
 const postLogin = (req, res, next) =>{
     passport.authenticate('local', {
       successRedirect: '/dashbord',
       failureRedirect: '/users/login',
       failureFlash: true
     })(req, res, next)
 }


// deconnexion
const getLogout = (req, res) =>{
    req.logout();
    req.flash('success_msg', 'Vous etes deconnecté')
    res.redirect('/users/login')
}


module.exports = {getLogin: getLogin, getRegister: getRegister, postRegister: postRegister, postLogin: postLogin, getLogout: getLogout}