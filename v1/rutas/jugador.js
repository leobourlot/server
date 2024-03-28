const { Router } = require ('express');

const { buscarPorId, buscarTodos, eliminar, crear, actualizar} = require ('../../controladores/jugador');

const { upload } = require('../../controladores/subirArchivo')

const router = Router();


// //eliminar
router.delete('/jugadores/:idJugador', eliminar); //http://localhost:3005/api/v1/futbolista/futbolistas/nºid

// //buscar
router.get('/jugadores', buscarTodos); //http://localhost:3005/api/v1/futbolista/futbolistas

//buscar por id
router.get('/jugadores/:idJugador', buscarPorId); //http://localhost:3005/api/v1/futbolista/futbolistas/nºid

//actualizar
router.put('/jugadores/:idJugador', upload, actualizar); //http://localhost:3005/api/v1/futbolista/futbolistas/nºid

module.exports = router;