const jwt = require('jsonwebtoken');
const registroBD = require('../baseDatos/registroBD');

require('dotenv').config();

const esJugador = async (req, res, next) => {


    const authHeader = req.headers['authorization'];
    console.log('ESTE ES EL TOKEN' + authHeader);
    const token = authHeader && authHeader.split(' ')[1]; // El token es enviado utilizando "Bearer"

    if (!token) {
        return res.sendStatus(401); // No autorizado
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, jugador) => {
        if (err) {
            return res .status(403).send({ status: "Fallo", data: { error: "Token inválido." } }); // Token inválido
        }

        const data = await registroBD.buscarPorId(jugador.idUsuario);

        // tipoUsuario = 0 jugador
        // tipoUsuario = 1 administrador
        if (data.tipoUsuario != 0) {
            return res.status(403).send({ status: "Fallo", data: { error: "No tiene los privilegios necesarios." } });
        }

        next();
    });
};

module.exports = { esJugador };