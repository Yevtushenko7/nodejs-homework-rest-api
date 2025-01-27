const { Contact } = require('../../model');

const patch = async (req, res, next) => {
    try {
        const { favorite } = req.body;
        if (!favorite) {
            return res.json({ status: 'error', code: 400, message: "missing field favorite" })
        }
        const contact = await Contact.findByIdAndUpdate(req.params.contactId, { favorite }, { new: true })
        if (contact) {
            return res.json({ status: 'success', code: 200, data: { contact } })
        }
        return res.json({ status: 'error', code: 404, message: 'Not found' })
    } catch (error) {
        next(error)
    }
};

module.exports = patch;