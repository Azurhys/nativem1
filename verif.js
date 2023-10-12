const Joi = require('joi');

const oeuvreSchema = Joi.object({
    nom: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().uri().required(),
    auteur: Joi.string().required(),
    dt_creation: Joi.string().pattern(new RegExp('^\\d{4}-\\d{2}-\\d{2}$')).required(),
  });
  
const schema = Joi.object({
    email: Joi.string()
    .email({ tlds: { allow: false } }) // Empêche les injections de code dans l'adresse email
    .required()
    .messages({
      'string.email': 'L\'email doit être une adresse email valide.',
      'any.required': 'L\'email est requis.',
    }),
  motDePasse: Joi.string()
    .min(8)
    .regex(/^[a-zA-Z0-9!@#$%^&*()_+,\-=.]+$/) // Empêche les caractères spéciaux
    .required()
    .messages({
      'string.min': 'Le nouveau mot de passe doit contenir au moins 8 caractères.',
      'any.required': 'Le nouveau mot de passe est requis.',
      'string.pattern.base': 'Le mot de passe ne peut pas contenir de caractères spéciaux.',
    }),

  newPassword: Joi.string()
    .min(8)
    .regex(/^[a-zA-Z0-9!@#$%^&*()_+,\-=.]+$/) // Empêche les caractères spéciaux
    .required()
    .messages({
      'string.min': 'Le nouveau mot de passe doit contenir au moins 8 caractères.',
      'any.required': 'Le nouveau mot de passe est requis.',
      'string.pattern.base': 'Le mot de passe ne peut pas contenir de caractères spéciaux.',
    }),
});

module.exports = schema;
