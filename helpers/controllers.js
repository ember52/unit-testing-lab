const utils = require('./utils')
const User = require('../models/user');

const addUser = async function (request, reply) {
    try {
      const userBody = request.body;
      console.log(userBody);
      userBody.fullName = utils.getFullName(
        userBody.firstName,
        userBody.lastName
      );
      delete userBody.firstName;
      delete userBody.lastName;
      const user = new User(userBody);
      const addedUser = await user.save();
      return addedUser;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  

const getAllUsers = async function (request, reply) {
    try {
      const users = User.find({});
      return users;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const getSingleUser = async function (request, reply) {
    try {
      const id = request.params.id;
      const user = await User.findById(id); // object
      // const user = User.find({_id:id});   // array of object
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const getDeleteUser = async function (request, reply) {
    try {
      const id = request.params.id;
      const deletedUser = await User.findByIdAndDelete(id); // object
      // const user = User.find({_id:id});   // array of object
      return { success: true, deleted: 1 };
    } catch (error) {
      throw new Error(error.message);
    }
  };

  module.exports = { addUser, getAllUsers, getSingleUser, getDeleteUser};
