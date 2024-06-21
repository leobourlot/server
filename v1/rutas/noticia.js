const {Router} = require('express');

const { buscarPorId, buscarTodos, nueva, buscarPaginadas, modificar, eliminar } = require('../../controladores/noticia');


const router = Router();

// solo las rutas que necesitamos segun los requerimientos del integrador
router
    .get('/noticias', buscarTodos)
    .get('/noticiasPaginadas', buscarPaginadas)
    .get('/noticias/:idNoticia', buscarPorId)
    .put('/modificar/:idNoticia', modificar)
    .delete('/eliminar/:idNoticia', eliminar)
    .post('/nueva', nueva);


module.exports = router;
