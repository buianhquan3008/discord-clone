import User, { UserInterface } from '../models/user';
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

/**
 * login
 * @param email 
 * @param password 
 * @returns 
 */
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

type UserType = {
  name: String;
  email: String;
  password: String;
  pic: String;
  isAdmin: Boolean;
};

async function signup(user: UserType) {
  try {
    const { email } = user;
    let existUser = await User.findOne({ email });
    if (existUser) throw Error('email not exist');
    const newUser = new User(user); 
    newUser.save();
    return newUser;
  } catch (err) {
    throw Error('save user fail!')
  }
}


export {
  getAllUsers,
  getDetailUser,
  login,
  signup,
  UserType,
}