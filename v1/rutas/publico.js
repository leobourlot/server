const { Router } = require('express');
const { check } = require('express-validator');
const { enviarCorreo, enviarCorreoInscripcion } = require('../../controladores/publico');
const { validarCampos } = require('../../middleware/validarCampos');

const router = Router();

router.post('/contacto', [
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('apellido', 'El apellido es requerido').not().isEmpty(),
    check('email', 'El email es requerido').isEmail(),
    check('telefono', 'El teléfono es requerido').not().isEmpty(),
    check('mensaje', 'El mensaje es requerido').not().isEmpty(),
    validarCampos
], enviarCorreo);

router.post('/contacto', enviarCorreoInscripcion);






module.exports = router;