import User from '../models/user';
import mongoose from 'mongoose';

/**
 * get all users
 */
async function getAllUsers() {
  return await User.find({ });
}

/**
 * get detail user
 * @param useId
 */
async function getDetailUser(useId: String) {
  return await User.findById(useId)
}

async function login(email: String, password: String) {
  // console.log(email)
  let user = await User.findOne({ email });
  if (!user) throw Error('email not exist');
  // let match = user.checkPassword(password);
  let match = user.password == password;
  // console.log(match)
  if (!match) throw Error('password is wrong');
  console.log(user)
  return user;
}



export {
  getAllUsers,
  getDetailUser,
  login,
}