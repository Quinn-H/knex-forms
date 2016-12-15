var express = require('express')

var db = require('../db')

module.exports = {
  get: get,
  newUser:newUser,
  addUser:addUser,
  getUser: getUser,
  updateUser: updateUser
}

function get (req, res) {
  db.getUsers()
    .then(function (users) {
      res.render('index', { users: users })
    })
    .catch(function (err) {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
}

function newUser (req, res) {
  res.render('user-new', null)
}

function addUser (req, res) {
  var user = {
    name:req.body.name,
    email:req.body.email
  }
  db.addUser(user)
  .then( () => {
    res.redirect('/')
  })
  .catch(function (err) {
    res.status(500).send('DATABASE ERROR: ' + err.message)
  })
}

function getUser (req, res) {
  var id = req.params.id
  db.getUser(id)
  .then( user => {
    res.render('user', user)
  })
  .catch(function (err) {
    res.status(500).send('DATABASE ERROR: ' + err.message)
  })
}

function updateUser (req, res) {
  var id = req.params.id
  var user = {
    name: req.body.name,
    email: req.body.email
  }
  db.updateUser(id,user)
  .then( user => {
    res.redirect('/')
  })
  .catch(function (err) {
    res.status(500).send('DATABASE ERROR: ' + err.message)
  })
}
