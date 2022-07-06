import User, { UserInterface } from '../models/user.model';
import mongoose from 'mongoose';

/**
 * get all users
 */
async function getAllUsers() {
  return await User.find({});
}

/**
 * get detail user
 * @param useId
 */
async function getDetailUser(useId: String) {
  return await User.findById(useId);
}

/**
 * login
 * @param email
 * @param password
 * @returns
 */
async function login(email: String, password: String) {
  let user = await User.findOne({ email });
  if (!user) throw Error('email not exist');
  let match = user.checkPassword(password);
  if (!match) throw Error('password is wrong');
  return user;
}

type UserType = {
  name: String;
  email: String;
  password: String;
  pic?: String;
  isAdmin?: Boolean;
};

/**
 * signup (Create new user)
 * @param user 
 */

async function signup(user: UserType) {
  const { email } = user;
  let existUser = await User.findOne({ email });
  if (existUser) throw Error('email exist');
  const newUser = new User(user);
  newUser.save();
  return newUser;
}

/**
 * authenticate
 * @param email 
 * @param password 
 * @returns 
 */

async function authenticate(email, password) {
  let user = await User.findOne({ email });
  if (!user) return null;
  let match = user.checkPassword(password);
  if (match) {
    // const { password, ...userWithoutPassword } = user;
    // return userWithoutPassword;
    return user;
  }
  return null;
}

export { UserType, getAllUsers, getDetailUser, login, signup, authenticate };
