const authController = require('../controllers/auth')
const Router = require('express')
const router = Router()


router.post('/signup',authController.signUp)

router.get('/login',authController.login)

module.exports = router