const productController = require('../controllers/product')
const isAuth = require('../middlewares/is-auth')
const Router = require('express')
const { check } = require('express-validator')
const router = Router()

router.post('/create-product',isAuth,[
    check('name','El nombre  debe de tener un minimo de 3 caracteres!')
    .isLength({min : 3})
    .trim(),
    check('description','La descripcion debe de tener un minimo de 7 caracteres')
    .isLength({min : 6})
     .trim()

],productController.createProduct)

module.exports = router