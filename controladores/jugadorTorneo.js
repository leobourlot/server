const jugadorTorneoBD = require('../baseDatos/jugadorTorneoBD');
const registroBD = require('../baseDatos/registroBD');

buscarPorId = async (req, res) => {
    try {
        const idTorneo = req.params.idTorneo;
        // console.log('idTorneo en el controlador es: ', idTorneo)

        if (!idTorneo) {
            res.status(404).json({ estado: 'FALLO', msj: 'Falta el id' });
        }

        const jugadoresInscriptos = await jugadorTorneoBD.buscarInscriptos(idTorneo);

        // console.log('jugadoresInscriptos en el controlador es: ', jugadoresInscriptos)

        res.json({ estado: 'OK', dato: jugadoresInscriptos });

    } catch (exec) {
        res.status(500).json({ estado: 'FALLA', msj: 'Error en buscarPorId' });
    }
}

buscarMisInscriptos = async (req, res) => {
    try {
        const idJugador = req.params.idJugador;
        // console.log('idJugador en el controlador es: ', idJugador)
        const torneosInscriptos = await jugadorTorneoBD.buscarMisInscriptos(idJugador);
        // console.log('torneosInscriptos en el controlador es: ', torneosInscriptos)
        res.status(200).json({ estdo: 'OK', dato: torneosInscriptos });
    } catch (exec) {
        throw (exec);
    }
}

buscarTodas = async (req, res) => {
    try {
        const jugadorTorneos = await jugadorTorneoBD.buscarTodas();
        res.status(200).json({ estdo: 'OK', dato: jugadorTorneos });
    } catch (exec) {
        throw (exec);
    }
}

buscarCosto = async (req, res) => {
    try {
        const costoInscripcion = await jugadorTorneoBD.buscarCosto();
        // console.log('costoInscripcion en el controlador es: ', costoInscripcion)
        res.status(200).json({ estdo: 'OK', dato: costoInscripcion });
    } catch (exec) {
        throw (exec);
    }
}

inscripcion = async (req, res) => {

    try {
        const { idTorneo, idJugador1, idJugador2 } = req.body;

        // console.log('idTorneo en el controlador es: ', idTorneo)
        // console.log('idJugador1 en el controlador es: ', idJugador1)
        // console.log('idJugador2 en el controlador es: ', idJugador2)

        const idTorneoInt = +idTorneo.idTorneo

        // console.log('idTorneoInt es: ', idTorneoInt)

        if (!idTorneoInt || !idJugador1 || !idJugador2) {
            res.status(404).json({ estado: 'FALLO', msj: `faltan datos requeridos, idTorneoInt es: ${idTorneoInt}, idJugador1 es: ${idJugador1}, idJugador2 es: ${idJugador2}` });
        }

        // Realizar una búsqueda para verificar si el jugador ya está inscrito en el torneo
        const jugadorYaInscrito = await jugadorTorneoBD.buscarPorJugadorYTorneo(idJugador1, idJugador2, idTorneoInt);
        if (jugadorYaInscrito) {
            res.status(400).json({ estado: 'FALLO', msj: 'El jugador ya está inscrito en este torneo' });
            return; // Agregar un return aquí para salir de la función si el jugador ya está inscrito
        }

        if (idJugador1 === idJugador2) {
            res.status(400).json({ estado: 'FALLO', msj: 'Ingrese el DNI de su compañero.' });
            return; // Agregar un return aquí para salir de la función si el jugador ya está inscrito
        }

        const jugadorInscripto = { jugador1: parseInt(idJugador1), jugador2: parseInt(idJugador2), torneo: idTorneoInt, activo: true };

        // console.log('jugadorInscripto en el controlador es: ', jugadorInscripto)
        const jugadorTorneoNuevo = await jugadorTorneoBD.agregarInscripto(jugadorInscripto);

        // console.log('jugadorTorneoNuevo en el controlador es: ', jugadorTorneoNuevo)
        res.status(201).json({ estado: 'OK', msj: 'Inscripcion completada', jugadorTorneo: jugadorTorneoNuevo });
    }

    catch (error) {
        console.log(error)
        res.status(500).json({ estado: 'FALLO', msj: 'Error en la inscripción' });
    }
}

buscarPorDni = async (req, res) => {
    const dni = req.params.dni

    const dniRegex = /^\d{1,8}$/;
    if (!dniRegex.test(dni)) {
        // console.log('ingrese solo numeros o menos de 9 digitos')
        return res.status(400).json({ estado: 'FALLO', msj: 'El DNI debe tener 8 caracteres como máximo y ser solo números' });
    }

    // console.log('dni en el controlador es: ', dni)

    try {
        const jugador = await registroBD.buscarPorDNI(dni);

        // console.log('jugador en el controlador es: ', jugador);

        res.json({ estado: 'OK', dato: jugador });

    } catch (exec) {
        res.status(500).json({ estado: 'FALLA', msj: 'Error' });
    }
}

eliminar = async (req, res) => {
    // console.log('datos que llegan desde el front es: ', req.params.idJugadorTorneo)
    const idJugadoresTorneos = req.params.idJugadorTorneo;
    // console.log('idJugadorTorneo en eliminar del controlador es: ', idJugadoresTorneos)

    if (!idJugadoresTorneos) {
        res.status(404).json({ estado: 'FALLO', msj: 'Falta el id' });;
    } else {
        try {
            await jugadorTorneoBD.eliminar(idJugadoresTorneos);
            res.status(200).json({ estado: 'OK', msj: 'Pareja eliminada' })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    buscarPorId, inscripcion, buscarTodas, buscarPorDni, eliminar, buscarMisInscriptos, buscarCosto
}
