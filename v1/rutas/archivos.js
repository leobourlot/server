const Router = require('express');

// const {buscarPorId, buscarTodos, nuevo, modificar, eliminar} = require('../../controladores/torneo');

const { uploadSingle, cambiarImagenTorneo, cambiarImagenTorneo2, cambiarCalendario1, cambiarCalendario2, cambiarCalendario3, cambiarRanking, cambiarRankingPdf, cambiarRankingVertical, handleUploadNoticiaImagen } = require('../../controladores/subirArchivo')
const { uploadImagenesNoticias, cambiarImagenesNoticias } = require('../../controladores/subirImagenesNoticias');



const router = Router();

router.post('/proximoTorneo', uploadSingle, cambiarImagenTorneo);
router.post('/proximoTorneo2', uploadSingle, cambiarImagenTorneo2);
router.post('/calendario1', uploadSingle, cambiarCalendario1);
router.post('/calendario2', uploadSingle, cambiarCalendario2);
router.post('/calendario3', uploadSingle, cambiarCalendario3);
router.post('/ranking', uploadSingle, cambiarRanking);
router.post('/rankingVertical', uploadSingle, cambiarRankingVertical);
router.post('/rankingPdf', uploadSingle, cambiarRankingPdf);
router.post('/noticia/:index', uploadSingle, handleUploadNoticiaImagen);
router.post('/imagenesNoticias', uploadImagenesNoticias, cambiarImagenesNoticias);

// router.put('/modificar/:idTorneo', upload, modificar);

// router.get('/torneos', buscarTodos);

// router.get('/torneos/:idtorneo', buscarPorId);

// router.delete('/eliminar/:idTorneo', eliminar);

module.exports = router;