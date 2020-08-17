const express = require('express')
const router = express.Router()
const getControllers = require('../controllers/index')
const  {ensureAuthenticated} = require('../config/auth')

router.get('/', getControllers.getIndex)

router.get('/dashbord', ensureAuthenticated, getControllers.getDashbord)



module.exports = router
