const { User } = require('../../model');
const { Conflict } = require('http-errors');

const signup = async (req, res) => {
    
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw new Conflict("Already register")
    }
    const newUser = new User({ email });
    newUser.setPassword(password);
    await newUser.save();
    res.status(201).json({
        newUser
    })
};

module.exports = signup;
