var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var main = require('./router/main')

app.listen(3000, function() {
    console.log("start express server on port 3000..")
});

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/main', main)

// url routing
app.get('/', function(req, res) {
    // res.send("<h1>hello my friend</h1>")
    // __dirname : /Users/hongkwon/Desktop/node
    res.sendFile(__dirname + "/public/main.html");
})

app.post('/email_post', function(req, res) {
    // get: req.param('email')
    // post? npm install body-parser --save
    console.log(req.body)
    console.log(req.body.email)
    res.send("<h1>welcome " + req.body.email + "</h1>")
})