const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');

exports.enviarCorreo = async (req, res) => {

    const {nombre, apellido, email, telefono, mensaje} = req.body;

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

