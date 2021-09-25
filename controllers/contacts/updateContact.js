const { Contact } = require('../../model');

const updateContact = async (req, res, next) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.contactId, req.body, { new: true })
        if (contact) {
            return res.json({ status: 'success', code: 200, data: { contact } })
        }
        return res.json({ status: 'error', code: 404, message: 'Not found' })
    } catch (error) {
        next(error)
    }
}

module.exports = updateContact;