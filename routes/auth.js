const authController = require('../controllers/auth')
const {check} = require('express-validator')
const Router = require('express')
const router = Router()


router.post('/signup',
    check('name','El nombre del usuario no puede ir vacio!')
    .not().isEmpty(),
    check('email','Ingrese un Email Valido')
    .not().isEmpty()
    .isEmail()
    .normalizeEmail(),
    check('password','El password debe de tener un minimo de 6 caracteres y contener palabras y/o numeros')
    .isAlphanumeric()
    .isLength({min:6})

,authController.signUp)

router.get('/login',authController.login)

module.exports = router