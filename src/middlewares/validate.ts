import Joi from 'joi';
import pick from '../utils/pick'
import httpStatus from 'http-status';
import ApiError from '../utils/apiError';

//TODO: validate middleware 

const validate = (schema) => (req, res, next) => {
  // console.log(schema);
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' } })
    .validate(object);
  // console.log(req, res)
  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }
  Object.assign(req, value);
  return next();
};

export default validate;