var environment = process.env.NODE_ENV || 'development'
var config = require('./knexfile')[environment]
var connection = require('knex')(config)

module.exports = {
  getUser: getUser,
  getUsers: getUsers,
  addUser: addUser,
  updateUser: updateUser,
  deleteUser: deleteUser
}

function getUsers (testDb) {
  // Use a test database if one is passed in, or the connection defined above.
  var db = testDb || connection
  return db('users').select()
}

function getUser (id, testDb) {
  var db = testDb || connection
  return db('users').where('id', id).first()
}

function addUser (user, testDb) {
  var db =testDb || connection
  return db('users')
  .insert({name: user.name, email: user.email})
}

function updateUser (id, user, testDb) {
  var db =testDb || connection
  return db('users')
  .where('id', id)
  .update(user)
}

function deleteUser (id, testDb) {
  var db =testDb || connection
  return db('users')
  .where('id', id)
  .del()
}
