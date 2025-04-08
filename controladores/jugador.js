const jugadorBD = require('../baseDatos/jugadorBD');

buscarPorId = async (req, res) => {
    try {
        const idJugador = req.params.idJugador;

        if (!idJugador) {
            res.status(404).json({ estado: 'FALLO', msj: 'Falta el id' });
        }

        const jugador = await jugadorBD.buscarPorId(idJugador);

        res.json({ estado: 'OK', dato: jugador });

    } catch (exec) {
        res.status(500).json({ estado: 'FALLA', msj: 'Error' });
    }
}

buscarTodos = async (req, res) => {

    //Filtros
    const firstName = req.query.firstName;
    const lastName = req.query.lastName;

    //Paginación
    const limit = req.query.limit;
    const page = req.query.page;
    // const offset = req.query.offset;
    const order = req.query.order;
    const asc = req.query.asc;

    try {
        let pLimit = limit ? Number(limit) : 15;
        let pPage = page ? Number(page) : 1;
        let pOffset = (pPage - 1) * pLimit;
        let pOrder = order || "idJugador";
        let pAsc = asc === "false" ? false : true;


        const jugadores = await jugadorBD.buscarTodos({ firstName, lastName }, pLimit, pOffset, pOrder, pAsc);

        res.json({ estado: 'OK', dato: jugadores });

    } catch (exec) {
        res.status(500).json({ estado: 'FALLA', msj: 'Error' });
    }
}

eliminar = async (req, res) => {
    const idJugador = req.params.idJugador;
    // console.log('idJugador es: ', idJugador)

    if (!idJugador) {
        res.status(404).json({ estado: 'FALLO', msj: 'Falta el id' });;
    } else {
        try {
            await jugadorBD.eliminar(idJugador);
            res.status(200).json({ estado: 'OK', msj: 'Jugador eliminado' })
        } catch (error) {
            res.status(500).json({ estado: 'FALLA', msj: 'Error' });
        }
    }

}

modificar = async (req, res) => {
    const { idJugador, dni, apellido, nombre, fechaNac, correoElectronico, telefono, localidad } = req.body;
    // console.log('idJugador en modificar antes de la modificacion es: ', idJugador)
    // console.log('dni en modificar antes de la modificacion es: ', dni)
    // console.log('apellido en modificar antes de la modificacion es: ', apellido)
    // console.log('nombre en modificar antes de la modificacion es: ', nombre)
    // console.log('correoElectronico en modificar antes de la modificacion es: ', correoElectronico)
    // console.log('telefono en modificar antes de la modificacion es: ', telefono)
    // console.log('localidad en modificar antes de la modificacion es: ', localidad)

    if (!idJugador) {
        res.status(404).json({ estado: 'FALLO', msj: 'faltan datos requeridos' });
    } else {
        const dato = {
            idJugador: idJugador,
            dni: dni,
            apellido: apellido,
            nombre: nombre,
            fechaNac: fechaNac,
            correoElectronico: correoElectronico,
            telefono: telefono,
            localidad: localidad
        }

        const jugadorModificado = await jugadorBD.modificar(dato, idJugador);
        // console.log('jugadorModificado es: ', jugadorModificado)
        res.status(200).json({ estado: 'OK', msj: 'Jugador modificado', dato: jugadorModificado });
    }
}

module.exports = {
    buscarPorId, buscarTodos, eliminar, modificar
}