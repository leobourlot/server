const {Router} = require('express');

const { buscarPorId, buscarTodos } = require('../../controladores/provincia');


const router = Router();

// solo las rutas que necesitamos segun los requerimientos del integrador
router
    .get('/provincias', buscarTodos)
    .get('/provincias/:idProvincia', buscarPorId);


module.exports = router;
