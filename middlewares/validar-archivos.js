module.exports = (req, res , next) =>{
    if(!req.files ||  Object.keys(req.files).length  === 0 ||!req.files.archivo){
        const error = new Error('No se ha provisto de ninguna imagen!')
        error.statusCode = 401
        next(error)
        return
    }

    next()
}