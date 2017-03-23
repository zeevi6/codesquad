var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')

var mysql = require('mysql')
var connection = mysql.createConnection({
    host: '192.168.56.105',
    port: 3306,
    user: 'hong',
    password: 'hong123',
    database: 'news_db'
})
connection.connect()

router.get('/', function(req, res) {
    res.redirect('/sublist')
})

router.get('/sublist', function(req, res) {

    var sublist = {
        item: []
    }

    var querySubs = connection.query('SELECT press, presslogo, issubbed FROM news', function(err, rows) {
        if (err) throw err
        for (let i = 0; i < rows.length; i++) {
            sublist.item.push({
                'press': rows[i].press,
                'presslogo': rows[i].presslogo,
                'issubbed': rows[i].issubbed
            })
        }

        var renderContent = { 'sublist': sublist }

        res.render('sublist.ejs', renderContent)
    })

})

module.exports = router