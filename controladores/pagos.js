const { MercadoPagoConfig, Preference, Payment } = require("mercadopago");
require('dotenv').config(); // Asegúrate de cargar las variables de entorno
// const { MERCADOPAGO_API_KEY } = require("../config.js");
const jugadorTorneoBD = require('../baseDatos/jugadorTorneoBD')
const torneoBD = require('../baseDatos/torneoBD')
const { obtenerToken } = require('../baseDatos/organizadorBD');

// const vendedorToken = await obtenerToken(idOrganizador);

// const client = new MercadoPagoConfig({
//     accessToken: vendedorToken,
//     options: { timeout: 5000 }
// })

// const preferenceApi = new Preference(client)




const crearOrden = async (req, res) => {

    try {
        // console.log('Antes de resultado: ')
        const { idTorneo, idOrganizador } = req.body;
        if (!idTorneo || !idOrganizador) {
            return res.status(400).json({ message: "Falta el ID del torneo" });
        }

        const vendedorToken = await obtenerToken(idOrganizador); // 👈 ahora sí, dentro de función async

        const client = new MercadoPagoConfig({
            accessToken: vendedorToken,
            options: { timeout: 5000 }
        });

        const preferenceApi = new Preference(client)
        const paymentApi = new Payment(client)

        const torneo = await torneoBD.buscarPorId(idTorneo);
        if (!torneo) {
            return res.status(404).json({ message: "Torneo no encontrado" });
        }

        console.log('torneo en el controlador es: ', torneo)

        const precio = parseInt(torneo[0].costoInscripcion);

        console.log('precio en el controlador es: ', precio)

        const resultado = await preferenceApi.create({
            body: {
                items: [
                    {
                        title: 'Inscripción a torneo',
                        unit_price: precio,
                        // currency_id: "ARS",
                        quantity: 2,
                        description: 'Inscripción a torneo'
                    },
                ],
                // notification_url: "https://wesley-defined-diamonds-garlic.trycloudflare.com/api/v1/pagos/webHook",
                notification_url: `${process.env.BASE_URL}/api/v1/pagos/webHook`,
                auto_return: "approved", // 🔹 Agrega esta línea

                back_urls: {
                    success: `${process.env.BASE_URL}/api/v1/pagos/success`,
                    //     pending: "https://a815-190-6-214-189.ngrok-free.app/api/v1/pagos/pending",
                    //     failure: "https://a815-190-6-214-189.ngrok-free.app/api/v1/pagos/failure",
                },
                // notification_url: "http://localhost:3005/api/v1/pagos/webHook",
                // back_urls: {
                //     success: "https://9b56-190-6-214-189.ngrok-free.app/api/v1/pagos/success",
                //     pending: "https://9b56-190-6-214-189.ngrok-free.app/api/v1/pagos/pending",
                //     failure: "https://9b56-190-6-214-189.ngrok-free.app/api/v1/pagos/failure",
                // },
            }
        });

        console.log('resultado es: ', resultado);

        // res.json({ message: "Payment creted" });
        res.json(resultado);
    } catch (error) {
        console.log('El error en la rpeferencia es: ', error)
        return res.status(500).json({ message: "Something goes wrong" });
    }
};

// const obtenerPaymentConReintento = async (id, reintentos = 1, delay = 5000) => {
//     const paymentApi = new Payment(client)
//     for (let i = 0; i < reintentos; i++) {
//         try {
//             const data = await paymentApi.get({ id });
//             // console.log('data en obtenerpayment es: ', data)
//             return data;
//         } catch (error) {
//             if (i === reintentos - 1) {
//                 throw error;
//             }
//             // Espera antes de reintentar
//             await new Promise(resolve => setTimeout(resolve, delay));
//         }
//     }
// };

// const recibeWebHook = async (req, res) => {
//     try {
//         // const query = req.query;

//         const payment = req.query;
//         // console.log(payment);
//         if (payment.type === "payment") {
//             // const data = await paymentApi.get({ id: payment["data.id"] });
//             const data = await obtenerPaymentConReintento(payment["data.id"]);

//             // console.log('data del payment es: ', data);
//             if (data && data.status === 'approved') {
//                 // Recupera la instancia de Socket.IO almacenada en app
//                 const io = req.app.get('socketio');
//                 // console.log('io es: ', io)
//                 if (io) {
//                     io.emit('paymentApproved', {
//                         paymentId: data.id,
//                         preferenceId: data.preference_id,
//                         status: data.status
//                     });
//                     console.log('Evento "paymentApproved" emitido');
//                 }
//                 else {
//                     console.log('error emitiendo el payment')
//                 }
//             }
//         }


//         res.sendStatus(204);
//     } catch (error) {
//         console.log('Error en el webhook: ', error);
//         return res.status(500).json({ message: "Something goes wrong" });
//     }
// };

// const estadoPago = async (req, res) => {
//     try {
//         const paymentId = req.params.id;

//         // console.log('payment id en estadoPago es: ', paymentId)
//         const payment = await paymentApi.get({ id: paymentId });

//         // console.log('paymentStatus en estadoPago es: ', payment.status)

//         res.json({ status: payment.status }); // "approved", "pending", "rejected"
//     } catch (error) {
//         console.error("Error obteniendo estado del pago:", error);
//         res.status(500).json({ message: "Error al obtener el estado del pago" });
//     }
// };

module.exports = {
    crearOrden,
    // recibeWebHook,
    // estadoPago
}