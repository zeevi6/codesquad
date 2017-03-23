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

// router.post('/form', function(req, res) {
//     console.log("email/form")
// })

router.post('/list', function(req, res) {
    // var email = req.body.email
    console.log("we're at.. subs/list")

    // mysql
    var responseData = {}
    var query = connection.query('select id_news, press, is_subbed from news', function(err, rows) {
        if (err) throw err;
        for (let i = 0; i < rows.length; i++) {
            if (rows[i]) {
                responseData[i].pressIndex = rows[i].id_news;
                responseData[i].press = rows[i].press;
                responseData[i].isSubbed = rows[i].is_subbed;
            } else {
                responseData[i].pressIndex = -1;
                responseData[i].press = "";
                responseData[i].isSubbed = -1;
            }
        }
        res.json(responseData)
    })
})

module.exports = router