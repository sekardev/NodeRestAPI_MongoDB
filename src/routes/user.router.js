const express = require('express');
const router = express.Router();
const user_controller = require('../controller/user.controller');
const middleware = require('../config/middleware');

router.get('/',middleware.tokenValidation, user_controller.users);
router.post('/login', user_controller.user_login);
router.get('/:id', middleware.tokenValidation,user_controller.user_details);
router.post('/signup',user_controller.user_create);
router.post('/create', middleware.tokenValidation,user_controller.user_create);
router.post('/:id/update',middleware.tokenValidation, user_controller.user_update);
router.delete('/:id/delete', middleware.tokenValidation,user_controller.user_delete);


module.exports = router;