var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var jsonData = {
    "result01": "NEWS",
    "result02": "BLOG",
    "result03": "CAFE"
}

app.listen(3000, function() {
    console.log("start express server on port 3000..")
});

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// url routing
app.get('/', function(req, res) {
    res.sendFile(__dirname + "/public/form02.html");
})
app.get('/main', function(req, res) {
    res.sendFile(__dirname + "/public/form02.html");
})

app.post('/search_post', function(req, res) {
    console.log(req.body)
    res.send("<h1>SEARCH RESULT</h1><h2>keyword: " + req.body.inputText + "</h2>")
})