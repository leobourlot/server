const conexion = require('./conexionBD');

const buscarPorId = async (idTorneo) => {

    const consulta = `SELECT * FROM torneos WHERE idTorneo = ?`;

    const [torneo] = await conexion.query(consulta, idTorneo);

    return torneo;
}


// `SELECT * FROM torneos as c
//     INNER JOIN provincias AS p ON p.idProvincia = t.provincia
//     WHERE t.idTorneo = ?`;
// `SELECT * FROM convocatoria as c
//                         INNER JOIN rival AS r ON r.idRival = c.rival
//                         WHERE c.idConvocatoria = ?`;

//                         

const buscarTodos = async () => {

    const consulta = `SELECT * FROM torneos`;

    const [torneos] = await conexion.query(consulta);

    return torneos;
}

const nuevo = async (torneo) => {

    const consulta = 'INSERT INTO torneos SET ?';
    const [torneoNuevo] = await conexion.query(consulta, torneo);

    return buscarPorId(torneoNuevo.insertId);
}

const modificar = async (dato, idTorneo) => {
    try {
        console.log('Datos recibidos para modificar:', dato);
        const consulta = 'UPDATE torneos SET ? WHERE idTorneo = ?';

        const [result] = await conexion.query(consulta, [dato, idTorneo]);

        return buscarPorId(idTorneo)
    } catch (error) {
        console.error('Error al modificar el torneo: ', error)
    }
}



const eliminar = async (idTorneo) => {
    console.log('idTorneo en eliminar de bd es: ', idTorneo)
    try {
        
        const consulta = 'DELETE FROM torneos WHERE torneos.idTorneo = ?';
        await conexion.query(consulta, [idTorneo]);
    } catch (error) {
        console.error('Error al eliminar el torneo: ', error)
    }
}

module.exports = {
    buscarPorId,
    buscarTodos,
    nuevo,
    modificar,
    eliminar,
}
