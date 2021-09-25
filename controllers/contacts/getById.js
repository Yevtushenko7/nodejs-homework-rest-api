const { Contact } = require('../../model');

const getById = async (req, res, next) => {
    try {
        const contact = await Contact.findById(req.params.contactId)
        if (contact) {
            return res.json({ status: 'success', code: 200, data: { contact } })
        }
        return res.json({ status: 'error', code: 404, message: 'Not found' })
    } catch (error) {
        next(error)
    }
}

module.exports = getById;