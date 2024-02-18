const { Router } = require ('express');

const { buscarPorId, buscarTodos, eliminar, crear, actualizar} = require ('../../controladores/futbolista');

const { upload } = require('../../controladores/subirArchivo')

const router = Router();


// //eliminar
router.delete('/futbolistas/:idFutbolista', eliminar); //http://localhost:3005/api/v1/futbolista/futbolistas/nºid

// //buscar
router.get('/futbolistas', buscarTodos); //http://localhost:3005/api/v1/futbolista/futbolistas

//buscar por id
router.get('/futbolistas/:idFutbolista', buscarPorId); //http://localhost:3005/api/v1/futbolista/futbolistas/nºid

//crear
router.post('/futbolistas', upload, crear); //http://localhost:3005/api/v1/futbolista/futbolistas/nºid

//actualizar
router.put('/futbolistas/:idFutbolista', upload, actualizar); //http://localhost:3005/api/v1/futbolista/futbolistas/nºid

module.exports = router;