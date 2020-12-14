const { Router } = require('express');
const validateJWT = require('../middlewares/jwt');
const { getUsers } = require('../controllers/user');

const router = Router();

router.get('/all', validateJWT, getUsers);


module.exports = router;