const {Schema, model} = require('mongoose')

const contactSchema = Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact']
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false
    }
}, {versionKey: false, timestamps: true})

const Contact = model('contact', contactSchema)

module.exports = {
    Contact
}