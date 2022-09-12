import DateExtension from '@joi/date';
import * as JoiImport from 'joi';
const Joi = JoiImport.extend(DateExtension);

const cardSchema = Joi.object({
  number: Joi.number().required(),
  cardholderName: Joi.string().required(),
  cvv: Joi.string().required(),
  expiration: Joi.date().format('MM/YY').required(),
  password: Joi.string().required(),
  isVirtual: Joi.boolean(),
  type: Joi.string().valid("credit", "debit", "both").required(),
  label: Joi.string().required(),
});

export default cardSchema;
