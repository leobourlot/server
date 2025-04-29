const Router = require('express');

// const {buscarPorId, buscarTodos, nuevo, modificar, eliminar} = require('../../controladores/torneo');

const { upload, cambiarImagenTorneo, cambiarImagenTorneo2, cambiarCalendario1, cambiarCalendario2, cambiarCalendario3, cambiarRanking, cambiarRankingPdf, cambiarRankingVertical } = require('../../controladores/subirArchivo')


const router = Router();

router.post('/proximoTorneo', upload, cambiarImagenTorneo);
router.post('/proximoTorneo2', upload, cambiarImagenTorneo2);
router.post('/calendario1', upload, cambiarCalendario1);
router.post('/calendario2', upload, cambiarCalendario2);
router.post('/calendario3', upload, cambiarCalendario3);
router.post('/ranking', upload, cambiarRanking);
router.post('/rankingVertical', upload, cambiarRankingVertical);
router.post('/rankingPdf', upload, cambiarRankingPdf);

// router.put('/modificar/:idTorneo', upload, modificar);

// router.get('/torneos', buscarTodos);

// router.get('/torneos/:idtorneo', buscarPorId);

// router.delete('/eliminar/:idTorneo', eliminar);

module.exports = router;