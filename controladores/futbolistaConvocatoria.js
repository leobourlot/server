const futbolistaConvocatoriaBD = require('../baseDatos/futbolistaConvocatoriaBD');

buscarPorId = async (req, res) => {
    try {
        const idFutbolistaConvocatoria = req.params.idFutbolistaConvocatoria;

        if (!idFutbolistaConvocatoria) {
            res.status(404).json({ estado: 'FALLO', msj: 'Falta el id' });
        }

        const futbolistasConvocados = await futbolistaConvocatoriaBD.buscarPorId(idFutbolistaConvocatoria);

        res.json({ estado: 'OK', dato: futbolistasConvocados });

    } catch (exec) {
        res.status(500).json({ estado: 'FALLA', msj: 'Error' });
    }
}

buscarTodas = async (req, res) => {
    try {
        const futbolistaConvocatorias = await futbolistaConvocatoriaBD.buscarTodas();
        res.status(200).json({ estdo: 'OK', dato: futbolistaConvocatorias });
    } catch (exec) {
        throw (exec);
    }
}

agregarConvocados = async (req, res) => {

    const { idConvocatoria, jugadoresConvocados } = req.body;

    if (!idConvocatoria || !jugadoresConvocados) {
        res.status(404).json({ estado: 'FALLO', msj: 'faltan datos requeridos' });

    } else {
        try {
            const futbolistasConvocados = [];

            for (const idFutbolista of jugadoresConvocados) {
                const idFutbolistaInt = +idFutbolista;
                if (!isNaN(idFutbolistaInt)) {
                    futbolistasConvocados.push({ futbolista: idFutbolistaInt, convocatoria: +idConvocatoria });
                }
            }

            if (futbolistasConvocados.length > 0) {
                // Inserta los futbolistas convocados en la tabla futbolistaConvocatoria. Con Promise.all, se espera a terminar con todos para agregar
                await Promise.all(
                    futbolistasConvocados.map(async (futbolistaConvocado) => {
                        await futbolistaConvocatoriaBD.agregarConvocados(futbolistaConvocado);
                    })
                );
                res.status(201).json({ estado: 'OK', msj: 'Convocatoria creada' });
            } else {
                res.status(404).json({ estado: 'FALLO', msj: 'Ningún futbolista convocado' });
            }
        } catch (exec) {
            throw exec;
        }
    }

}

agregarTitulares = async (req, res) => {
    const datosTitulares = req.body;
    // const { idCapitan } = req.body;

    const { idConvocatoria } = req.params;

    console.log('datosTitulares es: ', datosTitulares)
    // console.log('idCapitan es:', idCapitan)


    if (!idConvocatoria) {
        res.status(404).json({ estado: 'FALLO', msj: 'faltan datos requeridos' });
    } else {
        const jugadoresTitulares = datosTitulares.jugadoresTitulares.map(id => parseInt(id, 10));

        // const capitanNumero = parseInt(idCapitan, 10);
        const capitan = datosTitulares.idCapitan;
        console.log('jugadoresTitulares en el controlador en numeros: ', datosTitulares)
        console.log('capitan en el controlador es: ', capitan)

        const dato = {
            esTitular: 1,
            jugadoresTitulares: jugadoresTitulares,
            capitan: capitan,
            esCapitan: 1
        }

        console.log('dato en el controlador es: ', dato)
        const titulares = await futbolistaConvocatoriaBD.agregarTitulares(dato, idConvocatoria);

        res.status(200).json({ estado: 'OK', msj: 'Convocatoria modficada', dato: titulares });
    }
}

module.exports = {
    buscarPorId, agregarConvocados, buscarTodas, agregarTitulares
}
