const Router = require('express');

const {buscarPorId, buscarTodos, nuevo, modificar, eliminar} = require('../../controladores/torneo');

const { upload } = require('../../controladores/subirArchivo')


const router = Router();

router.post('/nuevo', upload, nuevo);

router.put('/modificar/:idTorneo', upload, modificar);

router.get('/torneos', buscarTodos);

router.get('/torneos/:idtorneo', buscarPorId);

router.delete('/eliminar/:idTorneo', eliminar);

module.exports = router;