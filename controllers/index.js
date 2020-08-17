

const getIndex = (req, res) =>{
    res.render('welcome')
}

const getDashbord = (req, res) =>{
    res.render('dashbord', {name: req.user.name})
}



module.exports = {getIndex: getIndex, getDashbord: getDashbord}