var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var router = require('./router/index')

var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'duvuguii_12',
    database: 'jsman'
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

// app.get('/main', function(req, res) {
//     res.sendFile(__dirname + '/public/main.html')
// })

// app.post('/send_email', function(req, res) {
//     res.render('email.ejs', { 'email': req.body.email })
// })

// app.post('/ajax_send_email', function(req, res) {

//     var email = req.body.email
//     console.log(email + " arrived.. (app.js)")

//     // responseData
//     // var resData = { 'result': 'ok', 'email': req.body.email }
//     // res.json(resData)

//     // validation ? db select

//     // mysql
//     var responseData = {}
//     var query = connection.query('select name from user where email="' + email + '"', function(err, rows) {
//         if (err) throw err;
//         if (rows[0]) {
//             console.log(rows)
//             responseData.result = "ok"
//             responseData.name = rows[0].name
//         } else {
//             console.log("no data - rows..")
//             responseData.result = "none";
//             responseData.name = ""
//         }
//         res.json(responseData)
//     })
// })