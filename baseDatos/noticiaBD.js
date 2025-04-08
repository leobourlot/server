const conexion = require('./conexionBD');

const buscarPorId = async (idNoticia) => {

    const consulta = `SELECT  idNoticia, titulo, descripcion, fecha, imagenes, descripcionesImagenes, contenidos, creador FROM noticias WHERE idNoticia = ?`;

    const [noticia] = await conexion.query(consulta,[idNoticia]);
    
    // console.log('noticia en bd es: ', noticia)

    return noticia;
}


const buscarTodos = async () => {
    
    const consulta = `SELECT idNoticia, titulo, descripcion, fecha, imagenes, descripcionesImagenes, contenidos, creador FROM noticias ORDER BY fecha DESC`;

    const [noticias] = await conexion.query(consulta);    

    // console.log('noticias en bd es: ', noticias)

    return noticias;
}

const buscarPaginadas = async (pagina, limite) => {

    const offset = (pagina - 1) * limite;

    const consulta = `SELECT idNoticia, titulo, descripcion, fecha, imagenes, descripcionesImagenes, contenidos, creador FROM noticias ORDER BY fecha DESC LIMIT ? OFFSET ?`;

    const [noticias] = await conexion.query(consulta, [limite, offset]);    

    // console.log('noticias en bd es: ', noticias)

    return noticias;
}

const nueva = async (noticia) => {

    const consulta = 'INSERT INTO noticias SET ?';
    const [nuevaNoticia] = await conexion.query(consulta, noticia);

    return buscarPorId(nuevaNoticia.insertId);
}

const modificar = async (dato, idNoticia) => {
    try {
        // console.log('Datos recibidos para modificar:', dato);
        const consulta = 'UPDATE noticias SET ? WHERE idNoticia = ?';

        const [result] = await conexion.query(consulta, [dato, idNoticia]);

        return buscarPorId(idNoticia)
    } catch (error) {
        console.error('Error al modificar la noticia: ', error)
    }
}

const eliminar = async (idNoticia) => {
    // console.log('idNoticia en eliminar de bd es: ', idNoticia)
    try {
        
        const consulta = 'DELETE FROM noticias WHERE idNoticia = ?';
        await conexion.query(consulta, [idNoticia]);
    } catch (error) {
        console.error('Error al eliminar la noticia: ', error)
    }
}

module.exports = {
    buscarPorId,
    buscarTodos,
    buscarPaginadas,
    nueva,
    modificar,
    eliminar
}
