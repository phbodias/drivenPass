import Joi from "joi";

const annotationSchema = Joi.object({
  text: Joi.string().max(1000).required(),
  label: Joi.string().max(50).required()
});

export default annotationSchema;
