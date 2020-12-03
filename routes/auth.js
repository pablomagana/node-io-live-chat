const { Router } = require('express');
const { check } = require('express-validator');

const { createUser, login, refreshToken } = require('../controllers/auth');
const validateFields = require('../middlewares/validateFields');
const validateJWT = require('../middlewares/jwt');

const router = Router();

router.post('/new', [
    check('name', 'Name parameter is required').not().isEmpty(),
    check('email', 'email parameter is required').not().isEmpty(),
    check('email', 'email is not valid').isEmail(),
    check('password', 'password parameter is required').not().isEmpty(),
    validateFields
], createUser);


router.post('/login',
    [
        check('email', 'email parameter is required').not().isEmpty(),
        check('email', 'email is not valid').isEmail(),
        check('password', 'password parameter is required').not().isEmpty(),
        validateFields

    ], login)

router.get('/refresh', validateJWT, refreshToken)

module.exports = router;