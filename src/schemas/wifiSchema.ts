import Joi from "joi";

const authSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().min(8).required(),
});

export default authSchema;
