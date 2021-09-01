const Joi = require('joi');

const schemaContacts = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    
    phone: Joi.string()
    .pattern(new RegExp('^.[0-9]{3}. [0-9]{3}-[0-9]{4}$'))
    .required(),
})


const validate = async (schema, obj, next) => {
    try {
        await schema.validateAsync(obj)
        next()
    }
   catch (err) {
       next({
           status: 400,
           message: err.message
       })
} 
}




module.exports = {
    schemaContacts: (req, res, next) => {
        return validate(schemaContacts, req.body,next)
    }
}