// JSON schema irá validar os campos de acordo com o minimo e máximo de caracteres que deve ser digitados
const Joi = require('@hapi/joi');

const patientSchema = Joi.object({
  name: Joi.string().required().min(1).max(250),
  email: Joi.string(),
  address: Joi.string().required().min(1).max(250),
  cpf: Joi.string().required().min(11).max(11),
  phone: Joi.number(),
  reason: Joi.string().required().min(3).max(250),
});

module.exports = patientSchema;
