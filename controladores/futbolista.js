const futbolistaBD = require('../baseDatos/futbolistaBD');

buscarPorId = async (req, res) => {
    try {
        const idFutbolista = req.params.idFutbolista;

        if (!idFutbolista) {
            res.status(404).json({ estado: 'FALLO', msj: 'Falta el id' });
        }

        const futbolista = await futbolistaBD.buscarPorId(idFutbolista);

        res.json({ estado: 'OK', dato: futbolista });

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
        let pOrder = order || "idFutbolista";
        let pAsc = asc === "false" ? false : true;


        const futbolistas = await futbolistaBD.buscarTodos({ firstName, lastName }, pLimit, pOffset, pOrder, pAsc);

        res.json({ estado: 'OK', dato: futbolistas });

    } catch (exec) {
        res.status(500).json({ estado: 'FALLA', msj: 'Error' });
    }
}

eliminar = async (req, res) => {
    const idFutbolista = req.params.idFutbolista;

    if (!idFutbolista) {
        res.status(404).json({ estado: 'FALLO', msj: 'Falta el id' });;
    } else {
        try {
            await futbolistaBD.eliminar(idFutbolista);
            res.status(200).json({ estado: 'OK', msj: 'Futbolista eliminado' })
        } catch (error) {
            res.status(500).json({ estado: 'FALLA', msj: 'Error' });
        }
    }

}

crear = async (req, res) => {
    const { dni, nombre, apellido, posicion, apodo, pieHabil } = req.body;

    let filename;
    if (!req.file) {
        filename = 'default.jpg';
    } else {
        filename = req.file.filename;
        console.log('filename en crear es: ', filename)
    }

    if (!dni || !nombre || !apellido || !posicion || !pieHabil) {

        res.status(404).json({ estado: 'FALLA', msj: 'Faltan datos obligatorios' })

    } else {
        const futbolista = {
            dni: dni,
            nombre: nombre,
            apellido: apellido,
            posicion: posicion,
            apodo: apodo,
            foto: filename,
            pieHabil: pieHabil
        }

        console.log('futbolista.foto es: ', futbolista.foto)
        try {
            const futbolistaNuevo = await futbolistaBD.nuevo(futbolista)
            res.status(201).json({ estado: 'OK', msj: 'Futbolista creado con éxito', dato: futbolistaNuevo })

        } catch (exec) {
            res.status(500).json({ estado: 'FALLA', msj: 'Error' });
        }
    }
}


actualizar = async (req, res) => {
    const idFutbolista = req.params.idFutbolista;
    const { dni, nombre, apellido, posicion, apodo, pieHabil } = req.body;
    let filename;
    if (!req.file) {
        filename = 'default.jpg';
    } else {
        filename = req.file.filename;
        console.log('filename editar es: ', filename)
    }

    const futbolista = {
        ...(dni && { dni }),
        ...(nombre && { nombre }),
        ...(apellido && { apellido }),
        ...(posicion && { posicion }),
        ...(apodo && { apodo }),
        ...(filename && { foto: filename }),
        ...(pieHabil && { pieHabil }),
    };

    console.log('futbolista.foto es: ', futbolista.foto)

    try {
        const futbolistaActualizado = await futbolistaBD.update(futbolista, idFutbolista)
        res.status(201).json({ estado: 'OK', msj: 'Futbolista modificado con éxito', dato: futbolistaActualizado })

    } catch (exec) {
        res.status(500).json({ estado: 'FALLA', msj: 'Error' });
    }
}

module.exports = {
    buscarPorId, buscarTodos, eliminar, crear, actualizar
}