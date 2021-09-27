const login = require('./login');
const logout = require('./logout');
const signup = require('./signup');
const current = require('./current');
const updateAvatar = require('./updateAvatar');
const verify = require('./verify');
const resending = require('./resending')

module.exports = {
    login,
    logout,
    signup,
    current,
    updateAvatar,
    verify,
    resending
}