const torneoBD = require('../baseDatos/torneoBD');
const provinciaBD = require('../baseDatos/provinciaBD');

buscarTodos = async (req, res) => {
    try {
        const torneos = await torneoBD.buscarTodos();
        const torneosConProvincias = await Promise.all(torneos.map(async (torneo) => {
            const provinciaTorneo = await provinciaBD.buscarPorId(torneo.provincia);
            // torneo.provincia = provinciaTorneo ? provinciaTorneo.nombreProvincia : ''; // Asigna el nombre de la provincia al torneo
            return torneo;
        }));
        // console.log('torneosConProvincias en el controlador es: ', torneosConProvincias)
        res.status(200).json({ estado: 'OK', dato: torneosConProvincias });
    } catch (exec) {
        throw (exec);
    }
    
}


buscarPorId = async (req, res) => {

    const idTorneo = req.params.idTorneo;
    if (!idTorneo) {
        res.status(404).json({ estado: 'FALLO', msj: 'No se especificó el id del torneo' });
    } else {
        try {
            const torneo = await torneoBD.buscarPorId(idTorneo);
            // console.log('torneo en la respuesta para la tabla es: ', torneo)
            res.status(200).json({ estado: 'OK', dato: torneo });
        } catch (exec) {
            throw (exec);
        }
    }

}

nuevo = async (req, res) => {

    const { fechaInicio, fechaFinal, ciudad, provincia, costoInscripcion } = req.body;

    let filename;
    if (!req.file) {
        filename = 'default.jpg';
    } else {
        filename = req.file.filename;
        // console.log('filename en crear es: ', filename)
    }

    // console.log('fechaInicio en el controlador es: ', fechaInicio)
    // console.log('fechaFinal en el controlador es: ', fechaFinal)
    // console.log('ciudad en el controlador es: ', ciudad)
    // console.log('provincia en el controlador es: ', provincia)

    if (!fechaInicio || !fechaFinal || !ciudad || !provincia || !costoInscripcion) {
        res.status(404).json({ estado: 'FALLO', msj: 'faltan datos requeridos' });
    } else {
        // console.log(provincia)
        const torneo = {
            foto: filename,
            fechaInicio: fechaInicio,
            fechaFinal: fechaFinal,
            ciudad: ciudad,
            provincia: provincia,
            costoInscripcion: costoInscripcion
        }

        try {
            const nuevoTorneo = await torneoBD.nuevo(torneo);
            res.status(201).json({ estado: 'OK', msj: 'Torneo creado', dato: nuevoTorneo });
        } catch (exec) {
            throw exec;
        }
    }

}

modificar = async (req, res) => {
    const { idTorneo, fechaInicio, fechaFinal, ciudad, provincia, costoInscripcion } = req.body;
    // console.log('idTorneo en modificar antes de la modificacion es: ', idTorneo)
    // console.log('fechaInicio en modificar antes de la modificacion es: ', fechaInicio)
    // console.log('fechaFinal en modificar antes de la modificacion es: ', fechaFinal)
    // console.log('ciudad en modificar antes de la modificacion es: ', ciudad)
    // console.log('provincia en modificar antes de la modificacion es: ', provincia)
    // console.log('provincia en modificar antes de la modificacion es: ', provincia)

    if (!idTorneo) {
        res.status(404).json({ estado: 'FALLO', msj: 'faltan datos requeridos' });
    } else {
        const dato = {
            idTorneo: idTorneo,
            fechaInicio: fechaInicio,
            fechaFinal: fechaFinal,
            ciudad: ciudad,
            provincia: provincia,
            costoInscripcion: costoInscripcion
        }

        const torneoModificado = await torneoBD.modificar(dato, idTorneo);
        // console.log('torneoModificado es: ', torneoModificado)
        res.status(200).json({ estado: 'OK', msj: 'Torneo modificado', dato: torneoModificado });
    }
}

cerrarInscripcion = async (req, res) => {
    const { idTorneo, activo } = req.body;
    // console.log('idTorneo en cerrar antes de la modificacion es: ', idTorneo)
    // console.log('activo en cerrar antes de la modificacion es: ', activo)

    if (!idTorneo || activo === undefined) {
        res.status(404).json({ estado: 'FALLO', msj: 'faltan datos requeridos' });
    } else {
        const dato = {
            activo: activo
        }

        const torneoInscripcionCerrada = await torneoBD.cerrarInscripcion(dato, idTorneo);
        // console.log('torneoInscripcionCerrada es: ', torneoInscripcionCerrada)
        res.status(200).json({ estado: 'OK', msj: 'Torneo modificado', dato: torneoInscripcionCerrada });
    }
}



eliminar = async (req, res) => {
    const idTorneo = req.params.idTorneo;
    // console.log('idTorneo en eliminar del controlador es: ', idTorneo)

    if (!idTorneo) {
        res.status(404).json({ estado: 'FALLO', msj: 'Falta el id' });;
    } else {
        try {
            await torneoBD.eliminar(idTorneo);
            res.status(200).json({ estado: 'OK', msj: 'Torneo eliminado' })
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
    cerrarInscripcion

}

