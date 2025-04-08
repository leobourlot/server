const organizadorBD = require('../baseDatos/organizadorBD');

buscarTodos = async (req, res) => {
    try {
        const organizadores = await organizadorBD.buscarTodos();
        
        res.status(200).json({ estado: 'OK', dato: organizadores });
    } catch (exec) {
        throw (exec);
    }
    
}

buscarPorId = async (req, res) => {
    const idOrganizador = req.params.idOrganizador;
    if (!idOrganizador) {
        res.status(404).json({ estado: 'FALLO', msj: 'No se especificó el id del organizador' });
    } else {
        try {
            const organizador = await organizadorBD.buscarPorId(idOrganizador);
            // console.log('torneo en la respuesta para la tabla es: ', torneo)
            res.status(200).json({ estado: 'OK', dato: organizador });
        } catch (exec) {
            throw (exec);
        }
    }

}

nuevo = async (req, res) => {

    const { apellido, ciudad, club } = req.body;
    
    if (!apellido || !ciudad || !club) {
        res.status(404).json({ estado: 'FALLO', msj: 'faltan datos requeridos' });
    } else {
        // console.log(provincia)
        const organizador = {
            apellido: apellido,
            ciudad: ciudad,
            club: club,
        }

        try {
            const nuevoOrganizador = await organizadorBD.nuevo(organizador);
            res.status(201).json({ estado: 'OK', msj: 'Organizador creado', dato: nuevoOrganizador });
        } catch (exec) {
            throw exec;
        }
    }

}

modificar = async (req, res) => {
    const { idOrganizador, apellido, ciudad, club } = req.body;
    // console.log('idOrganizador en modificar antes de la modificacion es: ', idOrganizador)
    // console.log('apellido en modificar antes de la modificacion es: ', apellido)
    // console.log('ciudad en modificar antes de la modificacion es: ', ciudad)
    // console.log('club en modificar antes de la modificacion es: ', club)

    if (!idOrganizador) {
        res.status(404).json({ estado: 'FALLO', msj: 'faltan datos requeridos' });
    } else {
        const dato = {
            idOrganizador: idOrganizador,
            apellido: apellido,
            ciudad: ciudad,
            club: club
        }

        const organizadorModificado = await organizadorBD.modificar(dato, idOrganizador);
        // console.log('organizadorModificado es: ', organizadorModificado)
        res.status(200).json({ estado: 'OK', msj: 'Organizador modificado', dato: organizadorModificado });
    }
}

eliminar = async (req, res) => {
    const idOrganizador = req.params.idOrganizador;
    // console.log('idOrganizador en eliminar del controlador es: ', idOrganizador)

    if (!idOrganizador) {
        res.status(404).json({ estado: 'FALLO', msj: 'Falta el id' });;
    } else {
        try {
            await organizadorBD.eliminar(idOrganizador);
            res.status(200).json({ estado: 'OK', msj: 'Organizador eliminado' })
        } catch (error) {
            console.log(error);
        }
    }
}


module.exports = {
    buscarTodos,
    buscarPorId,
    nuevo,
    modificar,
    eliminar,
}

