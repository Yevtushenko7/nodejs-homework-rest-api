const { User } = require('../../model');
const { Unauthorized } = require("http-errors");

const logout = async (req, res) => {
       const user = await User.findByIdAndUpdate(req.user._id, { token: null });
        if (!user) {
            throw new Unauthorized("Not authorized");
        }
        res.json({
            status: "success",
            code: 200,
            message: "Success logout"
        })
};

module.exports = logout;