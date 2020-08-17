const { ensureIndexes } = require("../models/User");

module.exports ={

    ensureAuthenticated: function(req, res, next){
      
    if(req.isAuthenticated()){
        
      return next()
    }
     req.flash('error_msg', 'Veiller vous enregistrez !!!')
     res.redirect('/users/login')
   }
}
