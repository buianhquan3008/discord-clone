import Joi from 'joi';
import { password, objectId } from './custom';

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    // role: Joi.string().required().valid('user', 'admin'),
  }),
};


const getDetailUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};


// TODO: For pagination
// const getUsers = {
//   query: Joi.object().keys({
//     name: Joi.string(),
//     role: Joi.string(),
//     sortBy: Joi.string(),
//     limit: Joi.number().integer(),
//     page: Joi.number().integer(),
//   }),
// };


export {
  createUser,
  getDetailUser,
};
