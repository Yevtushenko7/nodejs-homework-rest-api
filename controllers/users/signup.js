const { User } = require('../../model');
const { Conflict } = require('http-errors');
const gravatar = require('gravatar');
const { sendMail } = require('../../utils');

const signup = async (req, res) => {
    
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw new Conflict("Already register")
    }
    
    const newUser = new User({ email });
    newUser.setPassword(password);
    newUser.createVerifyToken();
    const { verifyToken } = newUser;
    newUser.avatarURL = gravatar.url(email, { protocol: "http" });
    const data = {
        to: email,
        subject: 'Confirmation of registration',
        html: `<a href="http://localhost:3000/api/users/verify/${verifyToken}">Confirm registration</a>`
    }
    await sendMail(data);
    await newUser.save();
    res.status(201).json({
        newUser,
        data
    })
};

module.exports = signup;
