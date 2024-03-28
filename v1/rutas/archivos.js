const Router = require('express');

// const {buscarPorId, buscarTodos, nuevo, modificar, eliminar} = require('../../controladores/torneo');

const { upload, cambiarImagenTorneo } = require('../../controladores/subirArchivo')


const router = Router();

router.post('/proximoTorneo', upload, cambiarImagenTorneo);

// router.put('/modificar/:idTorneo', upload, modificar);

// router.get('/torneos', buscarTodos);

// router.get('/torneos/:idtorneo', buscarPorId);

// router.delete('/eliminar/:idTorneo', eliminar);

module.exports = router;