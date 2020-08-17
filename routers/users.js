const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const getControllers = require('../controllers/users')

router.get('/login', getControllers.getLogin)


router.get('/register', getControllers.getRegister)



const urlencodedParser = bodyParser.urlencoded({ extended: false })
router.post('/register', urlencodedParser, getControllers.postRegister)


router.post('/login', urlencodedParser, getControllers.postLogin)

router.get('/logout', getControllers.getLogout)

module.exports = router