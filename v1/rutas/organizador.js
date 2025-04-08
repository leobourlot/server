const Router = require('express');

const {buscarPorId, buscarTodos, nuevo, modificar, eliminar} = require('../../controladores/organizador');

const router = Router();

router.post('/nuevo', nuevo);

router.put('/modificar/:idOrganizador', modificar);

router.get('/organizadores', buscarTodos);

router.get('/organizadores/:idOrganizador', buscarPorId);

router.delete('/eliminar/:idOrganizador', eliminar);

module.exports = router;