const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');

exports.enviarCorreo = async (req, res) => {

    const { nombre, apellido, email, telefono, mensaje } = req.body;

    const plantillaHds2 = fs.readFileSync(path.join(__dirname, '../utiles/handlebars/plantilla.hbs'), 'utf8');
    const correoTemplate = handlebars.compile(plantillaHds2);

    console.log(nombre);
    console.log(apellido);
    console.log(email);
    console.log(telefono);
    console.log(mensaje);

    // Datos de la plantilla
    const datos = {
        nombre: nombre,
        apellido: apellido,
        correo: email,
        telefono: telefono,
        mensaje: mensaje
    };

    console.log(datos)

    // Renderizo la plantilla con los datos
    const correoHtml = correoTemplate(datos);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.CORREO,
            pass: process.env.CLAVE
        }
    })

    const opciones = {
        from: 'ajpp',
        to: 'ajppargentina@gmail.com',
        subject: 'Consulta web',
        html: correoHtml
    }

    transporter.sendMail(opciones, (error, info) => {
        if (error) {
            console.log('error ->', error);
            const respuesta = 'correo no enviado';
            res.json({ respuesta });

        } else {
            console.log(info);
            const respuesta = 'correo enviado';
            res.status(200).json({ respuesta });
        }
    })
}

exports.enviarCorreoInscripcion = async (req, res) => {

    const { nombre1, apellido1, nombre2, apellido2, correoJugador1, correoJugador2 } = req.body;

    const plantillaHds2 = fs.readFileSync(path.join(__dirname, '../utiles/handlebars/plantillaInscripcion.hbs'), 'utf8');
    const correoTemplate = handlebars.compile(plantillaHds2);

    console.log(nombre1);
    console.log(apellido1);
    console.log(nombre2);
    console.log(apellido2);
    console.log(correoJugador1);
    console.log(correoJugador2);

    // Datos de la plantilla
    const datos = {
        nombre1: nombre1,
        nombre2: nombre2,
        apellido1: apellido1,
        apellido2: apellido2,
        correoJugador1: correoJugador1,
        correoJugador2: correoJugador2
    };

    console.log(datos)

    // Renderizo la plantilla con los datos
    const correoHtml = correoTemplate(datos);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.CORREO,
            pass: process.env.CLAVE
        }
    })

    const opcionesJugador1 = {
        from: 'ajpp',
        to: correoJugador1,
        subject: 'Confirmación de inscripción',
        html: correoHtml
    }

    const opcionesJugador2 = {
        from: 'ajpp',
        to: correoJugador2,
        subject: 'Confirmación de inscripción',
        html: correoHtml
    }

    try {
        // Enviar ambos correos simultáneamente y esperar a que ambos terminen
        await Promise.all([
            transporter.sendMail(opcionesJugador1),            
            transporter.sendMail(opcionesJugador2)
        ]);

        console.log('correos enviados')
        // Una única respuesta después de enviar ambos correos
        res.status(200).json({ respuesta: 'correo enviado' });
    } catch (error) {
        console.error('Error enviando correos:', error);
        res.status(500).json({ respuesta: 'correo no enviado' });
    }
    // transporter.sendMail(opcionesJugador1, (error, info) => {
    //     if (error) {
    //         console.log('error ->', error);
    //         console.log('error en enviar a jugador1')
    //         const respuesta = 'correo no enviado';
    //         res.json({ respuesta });

    //     } else {
    //         console.log(info);
    //         const respuesta = 'correo enviado';
    //         res.status(200).json({ respuesta });
    //     }
    // })

    // transporter.sendMail(opcionesJugador2, (error, info) => {
    //     if (error) {
    //         console.log('error ->', error);
    //         const respuesta = 'correo no enviado';
    //         res.json({ respuesta });

    //     } else {
    //         console.log(info);
    //         const respuesta = 'correo enviado';
    //         res.status(200).json({ respuesta });
    //     }
    // })
}
