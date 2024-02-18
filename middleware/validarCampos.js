const { validationResult } = require("express-validator");

const validarCampos = (req, res, next) =>{

    const error = validationResult(req);

    // existen errors?
    if (!error.isEmpty()){
        return res.status(400).json({estado:'FALLA', msj:error.mapped()})
    }

    // no hay errores sigo con la ejecucion del controlador de la ruta
    next();
}

module.exports ={
    validarCampos,
}