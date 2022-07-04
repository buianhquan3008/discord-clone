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

export {
  getDetailUser,
};
