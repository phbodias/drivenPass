import Joi from "joi";

const credentialSchema = Joi.object({
  url: Joi.string().uri().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  label: Joi.string().required()
});

export default credentialSchema;
