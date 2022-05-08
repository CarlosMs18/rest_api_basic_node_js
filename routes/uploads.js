const uploadsController = require('../controllers/uploads')
const isAuth = require('../middlewares/is-auth')
const validarArchivo = require('../middlewares/validar-archivos')
const Router = require('express')
const router = Router()


router.put('/:coleccion/:id',isAuth, [
    validarArchivo
],uploadsController.updatedUpload)

module.exports = router