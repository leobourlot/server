const noticiaBD = require('../baseDatos/noticiaBD');

// retorna el rival, segun el idRival que recibe
buscarPorId = async (req, res) => {
    try {
        const idNoticia = req.params.idNoticia;
        // console.log('idProvincia en el controlador es: ', idProvincia)
        if (!idNoticia) {
            res.status(404).json({ estado: 'FALLO', msj: 'Falta el id de la noticia que quiere buscar' });
        }

        const noticia = await noticiaBD.buscarPorId(idNoticia);

        console.log('noticia en controlador es :', noticia)

        res.json({ estado: 'OK', dato: noticia })
        // console.log('provincia en el controlador es: ', provincia);
        // console.log('nombreProvincia en el controlador es: ', provincia[0].nombreProvincia);

    } catch (exec) {
        throw exec;
    }
}

// retorna todos los rivales activos
buscarTodos = async (req, res) => {
    try {
        const noticias = await noticiaBD.buscarTodos();
        // console.log('noticias en el controlador es: ', noticias)
        res.json({ estado: 'OK', dato: noticias });
    } catch (exec) {
        throw exec;
    }
}

buscarPaginadas = async (req, res) => {
    try {
        const pagina = parseInt(req.query.pagina) || 1;
        const limite = parseInt(req.query.limite) || 6;

        const noticias = await noticiaBD.buscarPaginadas(pagina, limite);
        // console.log('noticias en el controlador es: ', noticias)
        res.json({ estado: 'OK', dato: noticias });
    } catch (exec) {
        throw exec;
    }
}

nueva = async (req, res) => {

    const { titulo, descripcion, imagenes, descripcionesImagenes, contenidos } = req.body;

    // console.log('req.body es: ', req.body)
    // console.log('idNoticia en el controlador es: ', idNoticia)
    // console.log('titulo en el controlador es: ', titulo)
    // console.log('descripcion en el controlador es: ', descripcion)
    // console.log('urlImagen en el controlador es: ', imagenes)
    // console.log('descripcionImagen en el controlador es: ', descripcionesImagenes)
    // console.log('contenido en el controlador es: ', contenidos)

    if (!titulo || !descripcion || !imagenes || !descripcionesImagenes || !contenidos) {
        res.status(404).json({ estado: 'FALLO', msj: 'faltan datos requeridos' });
    } else {

        const noticia = {
            titulo: titulo,
            descripcion: descripcion,
            imagenes: JSON.stringify(imagenes),
            descripcionesImagenes: JSON.stringify(descripcionesImagenes),
            contenidos: JSON.stringify(contenidos),
        }

        try {
            const nuevaNoticia = await noticiaBD.nueva(noticia);
            res.status(201).json({ estado: 'OK', msj: 'Noticia creada', dato: nuevaNoticia });
        } catch (exec) {
            throw exec;
        }
    }

}

modificar = async (req, res) => {
    const { titulo, descripcion, imagenes, descripcionesImagenes, contenidos } = req.body;
    const idNoticia = req.params.idNoticia
    // console.log('req.body es: ', req.body)
    // console.log('idNoticia en el controlador es: ', idNoticia)
    // console.log('titulo en el controlador es: ', titulo)
    // console.log('descripcion en el controlador es: ', descripcion)
    // console.log('urlImagen en el controlador es: ', urlImagen)
    // console.log('descripcionImagen en el controlador es: ', descripcionImagen)
    // console.log('contenido en el controlador es: ', contenido)

    if (!idNoticia || !titulo || !descripcion || !imagenes || !descripcionesImagenes || !contenidos) {

        res.status(404).json({ estado: 'FALLO', msj: 'faltan datos requeridos' });
    } else {
        const dato = {
            idNoticia: idNoticia,
            titulo: titulo,
            descripcion: descripcion,
            imagenes: JSON.stringify(imagenes),
            descripcionesImagenes: JSON.stringify(descripcionesImagenes),
            contenidos: JSON.stringify(contenidos),
        }

        const noticiaModificada = await noticiaBD.modificar(dato, idNoticia);
        console.log('noticiaModificada es: ', noticiaModificada)
        res.status(200).json({ estado: 'OK', msj: 'Noticia modificada', dato: noticiaModificada });
    }
}

eliminar = async (req, res) => {
    const idNoticia = req.params.idNoticia;
    // console.log('idNoticia en eliminar del controlador es: ', idNoticia)

    if (!idNoticia) {
        res.status(404).json({ estado: 'FALLO', msj: 'Falta el id' });;
    } else {
        try {
            await noticiaBD.eliminar(idNoticia);
            res.status(200).json({ estado: 'OK', msj: 'Noticia eliminada' })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    buscarPorId,
    buscarTodos,
    buscarPaginadas,
    modificar,
    eliminar,
    nueva
}