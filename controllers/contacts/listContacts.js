const { Contact } = require('../../model');

const listContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({ owner: req.user._id}).populate("owner", "_id email subscription")
    return res.json({ status: 'success', code: 200, data: { contacts } })
  } catch (error) {
    next(error)
  }
  
};

module.exports = listContacts;