const { User } = require('../../model');
const sendMail = require('../../utils');
const { NotFound, BadRequest } = require('http-errors');

const resending = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!email) {
        throw new BadRequest('Email is required')
    }
    if (!user) {
        throw new NotFound('Not found')
    }
    if (!user.verify) {
        throw new BadRequest('Verification has already been passed')
    }
    const data = {
        to: email,
        subject: 'Confirmation of registration',
        html: `<a href="http://localhost:3000/api/users/verify/${user.verifyToken}">Confirm registration</a>`
    }
    await sendMail(data);
    res.json({ "message": "Verification email sent" })
};

module.exports = resending;