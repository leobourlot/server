const Router = require('express');

const {buscarPorId, buscarTodas, nueva, modificar, eliminar} = require('../../controladores/convocatoria');


const router = Router();

router.post('/nueva', nueva);

router.put('/modificar/:idConvocatoria', modificar);

router.get('/convocatorias', buscarTodas);

router.get('/convocatorias/:idConvocatoria', buscarPorId);

router.delete('/eliminar/:idConvocatoria', eliminar);

module.exports = router;