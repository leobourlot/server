const { Router } = require ('express');

const { buscarPorId, buscarTodas, inscripcion, buscarPorDni, eliminar, buscarMisInscriptos, buscarCosto } = require ('../../controladores/jugadorTorneo');

const router = Router();


//buscar por id
router.get('/jugadorTorneo/:idTorneo', buscarPorId); //http://localhost:3005/api/v1/jugadorTorneo/jugadorTorneo/nºid

//buscar todo
router.get('/jugadorTorneo', buscarTodas);

//buscar costo
router.get('/costo', buscarCosto);

//buscar misInscriptos
router.get('/misInscriptos/:idJugador', buscarMisInscriptos);

//agregar
router.post('/inscripcion', inscripcion);

//buscar por dni
router.get('/consulta/:dni', buscarPorDni)

// eliminar
router.delete('/eliminar/:idJugadorTorneo', eliminar);


module.exports = router;