var path = require('path')

var express = require('express')
var bodyParser = require('body-parser')
var hbs = require('express-handlebars')

var index = require('./routes/index')

var server = express()

module.exports = server

// Middleware

server.engine('hbs', hbs({extname: 'hbs'}))
server.set('view engine', 'hbs')
server.set('views', path.join(__dirname, 'views'))
server.use(bodyParser.urlencoded({ extended: true }))

// Routes

server.get('/', index.get)
server.get('/user-new', index.newUser)
server.post('/user-new', index.addUser)
server.get('/user/:id', index.getUser)
server.post('/user/:id', index.updateUser)
