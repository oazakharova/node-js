const joi = require("joi");

const userSchema = joi.object({
  firstName: joi.string().min(2).required(),
  secondName: joi.string().min(2).required(),
  age: joi.number().min(1).required(),
  city: joi.string().min(2),
});

module.exports = { userSchema };
