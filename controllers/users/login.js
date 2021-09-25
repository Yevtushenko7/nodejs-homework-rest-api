const { User } = require('../../model');
const jwt = require("jsonwebtoken");
const { BadRequest } = require('http-errors');


const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (!user) {
        throw new BadRequest("Wrong email or password")
    }
    const compareResult = user.comparePassword(password)
    if (!compareResult) {
       throw new BadRequest("Wrong email or password")
    }
    const id = user.id;
    const payload = { id };
    const { SECRET_KEY } = process.env;
    const token = jwt.sign(payload, SECRET_KEY);
    await User.findByIdAndUpdate(id, {token});

    return res.json({
        token
    });
}

module.exports = login;
