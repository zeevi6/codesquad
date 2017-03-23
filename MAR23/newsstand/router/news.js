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
    res.redirect('/newslist')
})

router.post('/unsub', function(req, res) {
    var target = req.body.press
    var queryString = 'UPDATE news SET issubbed=0 WHERE press="' + target + '"'
    var update = connection.query(queryString, function(err, rows) {
        if (err) throw err
    })
})

router.get('/newslist', function(req, res) {

    // [[[[[[[[[[[[[[ RENDER ]]]]]]]]]]]]]]]]

    var presslist = {
        item: []
    }

    var content = {
        item: []
    }

    var queryStringList = 'SELECT press, imgurl, articles FROM news WHERE issubbed=1';
    var selectList = connection.query(queryStringList, function(err, rows) {
        if (err) throw err;
        // 첫번째 요소
        var defaultPress = rows[0].press
        for (let i = 0; i < rows.length; i++) {
            presslist.item.push({ 'press': rows[i].press })
            content.item.push({ 'press': rows[i].press, 'imgurl': rows[i].imgurl, 'articles': JSON.parse(rows[i].articles) })
        }

        var renderContent = { 'presslist': presslist, 'content': content }

        res.render('newslist.ejs', renderContent)
    })

})

module.exports = router