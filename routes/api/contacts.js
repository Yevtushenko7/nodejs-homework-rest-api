const express = require('express');
const router = express.Router();
const { validation, authenticate, controllerWrapper } = require('../../middlewares');
const { contacts: ctrl } = require('../../controllers');
const { contactJoiSchema } = require('../../model/contacts');

const contactValid = validation(contactJoiSchema);

router.get('/', controllerWrapper(authenticate), controllerWrapper(ctrl.listContacts));

router.get('/:contactId', controllerWrapper(authenticate), controllerWrapper(ctrl.getById));

router.post('/', controllerWrapper(authenticate), contactValid, controllerWrapper(ctrl.addContact));

router.delete('/:contactId', controllerWrapper(authenticate), controllerWrapper(ctrl.removeContact));

router.put('/:contactId', controllerWrapper(authenticate), contactValid, controllerWrapper(ctrl.updateContact));

router.patch('/:contactId/favorite', controllerWrapper(authenticate), controllerWrapper(ctrl.patch));

module.exports = router;
