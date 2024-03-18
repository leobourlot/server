const Router = require('express');

const { nuevoJugador } = require('../../controladores/registro');

// const { upload } = require('../../controladores/subirArchivo')


const router = Router();

router.post('/nuevo', nuevoJugador);

module.exports = router;