const { Router } = require ('express');

const { buscarPorId, buscarTodas, agregarConvocados, agregarTitulares } = require ('../../controladores/futbolistaConvocatoria');

const router = Router();


//buscar por id
router.get('/futbolistaConvocatoria/:idFutbolistaConvocatoria', buscarPorId); //http://localhost:3005/api/v1/futbolistaConvocatoria/futbolistaConvocatoria/nºid

//buscar todo
router.get('/futbolistaConvocatoria', buscarTodas);

//agregar
router.post('/agregarConvocados', agregarConvocados);

//titulares
router.put('/agregarTitulares/:idConvocatoria', agregarTitulares);


module.exports = router;