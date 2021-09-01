const express = require('express')
const router = express.Router()
const Contacts = require('../../model')
const { schemaContacts } = require('../api/validation')

router.get('/', async (req, res, next) => {

  try {
    const contacts = await Contacts.listContacts()
    return res.json({ status: 'success', code: 200, data: { contacts } })
  } catch (error) {
    next(error)
  }
 
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId)
    if (contact) {
      return res.json({ status: 'success', code: 200, data: { contact } })
    }
    return res.json({ status: 'error', code: 404, message: 'Not found' })
  } catch (error) {
    next(error)
  }
 
})

router.post('/',schemaContacts, async (req, res, next) => {
  
  try {
    const contact = await Contacts.addContact(req.body)
    console.log(req.body);
    return res.status(201).json({ status: 'success', code: 201, data: { contact } })
  } catch (error) {
    next(error)
  }
  
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId)
    if (contact) {
      return res.json({ status: 'success', code: 200, data: { contact } })
    }
    
    return res.json({ status: 'error', code: 404, message:'Not found' })
  } catch (error) {
    next(error)
  }

  
})

router.put('/:contactId',schemaContacts, async (req, res, next) => {
   try {
    const contact = await Contacts.updateContact(req.params.contactId, req.body)
    if (contact) {
      return res.json({ status: 'success', code: 200, data: { contact } })
    }
    
    return res.json({ status: 'error', code: 404, message:'Not found' })
  } catch (error) {
    next(error)
  }
})

module.exports = router
