var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')

var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'duvuguii_12',
    database: 'jsman'
})
connection.connect()

router.post('/form', function(req, res) {
    console.log("email/form")
})

router.post('/ajax', function(req, res) {

    var email = req.body.email
    console.log(email + " arrived.. (app.js)")

    // mysql
    var responseData = {}
    var query = connection.query('select name from user where email="' + email + '"', function(err, rows) {
        if (err) throw err;
        if (rows[0]) {
            console.log(rows)
            responseData.result = "ok"
            responseData.name = rows[0].name
        } else {
            console.log("no data - rows..")
            responseData.result = "none";
            responseData.name = ""
        }
        res.json(responseData)
    })
})

module.exports = router