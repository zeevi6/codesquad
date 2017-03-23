var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var router = require('./router/index')

var mysql = require('mysql')
var connection = mysql.createConnection({
    host: '192.168.56.105',
    port: 3306,
    user: 'hong',
    password: 'hong123',
    database: 'news_db'
})
connection.connect()

app.listen(3000, function() {
    console.log("start express server on port 3000..")
});

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(router)
app.set('view engine', 'ejs')