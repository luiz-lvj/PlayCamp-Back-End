import Joi from 'joi';

export const userSchema = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().min(1).required(),
    password: Joi.string().required(),
    userType: Joi.string().valid("developer", "normal").required()
});