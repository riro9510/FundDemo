import Joi from 'joi';

export const tokenSchema = Joi.object({
  clientId: Joi.string().min(3).max(50).required().messages({
    'string.base': '`clientId` should be a type of string',
    'string.empty': '`clientId` cannot be empty',
    'string.min': '`clientId` should have at least {#limit} characters',
    'string.max': '`clientId` should have at most {#limit} characters',
    'any.required': '`clientId` is required',
  }),
});
