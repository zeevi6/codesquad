var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')
var main = require('./main')
var subs = require('./subs')

router.use('/main', main)
router.use('/subs', subs)

// url routing
router.get('/', function(req, res) {
    console.log("index router loaded..");
    res.sendFile(path.join(__dirname, '../public/news.html'))
})

module.exports = router