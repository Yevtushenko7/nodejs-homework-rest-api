const express = require('express')
const router = express.Router()
const { Contact } = require('../../model')
const { schemaContacts } = require('../api/validation')

router.get('/', async (req, res, next) => {

  try {
    const contacts = await Contact.find({})
    return res.json({ status: 'success', code: 200, data: { contacts } })
  } catch (error) {
    next(error)
  }
 
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.contactId)
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
    const contact = await Contact.create(req.body)
    console.log(req.body);
    return res.status(201).json({ status: 'success', code: 201, data: { contact } })
  } catch (error) {
    next(error)
  }
  
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.contactId)
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
    const contact = await Contact.findByIdAndUpdate(req.params.contactId, req.body, {new: true})
    if (contact) {
      return res.json({ status: 'success', code: 200, data: { contact } })
    }
    
    return res.json({ status: 'error', code: 404, message:'Not found' })
  } catch (error) {
    next(error)
  }
})

router.patch('/:contactId/favorite', async (req, res, next) => {
  try {
    const { favorite } = req.body;
    if (!favorite) {
      return res.json({status: 'error', code: 400, message: "missing field favorite"})
    }
    const contact = await Contact.findByIdAndUpdate(req.params.contactId, { favorite }, { new: true })
    if (contact) {
      return res.json({ status: 'success', code: 200, data: { contact } })
    }
    
    return res.json({ status: 'error', code: 404, message:'Not found' })
  } catch (error) {
     next(error)
  }
})

module.exports = router
