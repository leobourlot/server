const Router = require('express');

const {buscarPorId, buscarTodos, nuevo, modificar, eliminar, cerrarInscripcion} = require('../../controladores/torneo');

const { upload } = require('../../controladores/subirArchivo')


const router = Router();

router.post('/nuevo', upload, nuevo);

router.put('/modificar/:idTorneo', upload, modificar);

router.put('/cerrarInscripcion/:idTorneo', cerrarInscripcion);

router.get('/torneos', buscarTodos);

router.get('/torneos/:idtorneo', buscarPorId);

router.delete('/eliminar/:idTorneo', eliminar);

module.exports = router;