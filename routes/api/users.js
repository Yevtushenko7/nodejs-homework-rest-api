const express = require('express');
const router = express.Router();
const { validation,controllerWrapper,authenticate } = require('../../middlewares');
const { users: ctrl } = require('../../controllers');
const { userJoiSchema } = require('../../model/users')

const userValidationMiddleware = validation(userJoiSchema);

router.post('/signup', userValidationMiddleware, controllerWrapper(ctrl.signup))

router.post('/login', userValidationMiddleware, controllerWrapper(ctrl.login))

router.post('/logout', controllerWrapper(authenticate), controllerWrapper(ctrl.logout))

router.get('/current', controllerWrapper(authenticate), controllerWrapper(ctrl.current))

module.exports = router;