const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const flash = require('connect-flash');
const session = require('express-session')
const passport = require('passport')
const app = express()
const port = 4000



//passport config
require('./config/passport')(passport)


//  BODY-PARSER
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())




// EJS
app.set('view engine', 'ejs')


// CONNECT DB

mongoose.connect("mongodb://localhost/newLogin", {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('je suis connecté');
  
});




// EXPRESS SESSION
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }))


// PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());



// CONNECT FLASH
app.use(flash())


//GLOBAL VARS
app.use((req, res, next) =>{
   res.locals.success_msg = req.flash('success_msg'),
   res.locals.error_msg = req.flash('error_msg')
   res.locals.error = req.flash('error')
   next()
})




//  ROUTER
const getRouter = require('./routers/index')
app.use('/', getRouter)

const getRouterusers = require('./routers/users')
app.use('/users', getRouterusers)



app.listen(port, () =>{
    console.log('mon port marche sur: ', port);
    
})



