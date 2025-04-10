const { Router } = require('express');
const path = require('path');

const { crearOrden, recibeWebHook, estadoPago } = require('../../controladores/pagos');

const router = Router();

router
    .get('/success', (req, res) => {
        console.log('pagina success llamada')
        res.sendFile(path.join(__dirname, '../../public/success.html'));
    })
    .get('/pending', (req, res) => {
        res.send('Pago pendiente');
    })
    .get('/failure', (req, res) => {
        res.send('Pago fallido');
    })
    // .get('/estado/:id', estadoPago)
    .post('/crearOrden', crearOrden)
    // .post('/webHook', recibeWebHook);



module.exports = router;
