const sgMail = require('@sendgrid/mail');
const { InternalServerError } = require('http-errors');
const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = async (data) => {
    try {
        const mail = { ...data, from: "korish140193@gmail.com" };
        await sgMail.send(mail);
        return true;
    } catch (error) {
       
    }
};

module.exports = sendMail;