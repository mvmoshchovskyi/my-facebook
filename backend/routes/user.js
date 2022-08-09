const {Router} = require('express');
const {register, activateAccount, login} = require('../controllers/user')
const router = Router();

router.post('/register', register)
router.post('/activate', activateAccount)
router.post('/login', login)
module.exports = router
