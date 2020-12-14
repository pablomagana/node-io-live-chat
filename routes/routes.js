const auth = require('./auth');
const users = require('./users');
const messages = require('./messages');

const { Router } = require('express');


const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/msg', messages);

module.exports = router;