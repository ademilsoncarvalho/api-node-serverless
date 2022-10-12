'use strict';
const UserController = require('./src/controllers/UserController');

module.exports.listUsers = async (event) => {
  return UserController.findUsers();
};

module.exports.findUser = async (event) => {
  let { userId } = event.pathParameters
  return UserController.findUserById(userId);
};

module.exports.createUser = async (event) => {
  let data = JSON.parse(event.body);
  return UserController.saveUser(data);
};

module.exports.updateUser = async (event) => {
  let data = JSON.parse(event.body);
  let { userId } = event.pathParameters;
  return UserController.updateUser(userId, data);
};

module.exports.removeUser = async (event) => {
  let { userId } = event.pathParameters
  return UserController.deleteUser(userId);
};