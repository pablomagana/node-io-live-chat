const { Router } = require('express');
const jwtMid = require('../middlewares/jwt');
const messageCtrl = require('../controllers/message');


const router = Router();

router.get('/:from', jwtMid, messageCtrl.getChatMessages);

module.exports = router;