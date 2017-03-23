var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var router = require('./router/news')
var router2 = require('./router/subs')

app.listen(3000, function() {
    console.log("start server on port 3000...")
})

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(router)
app.use(router2)