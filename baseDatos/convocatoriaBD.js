const conexion = require('./conexionBD');

const buscarPorId = async (idConvocatoria) => {

    const consulta = `SELECT * FROM convocatoria as c
                        INNER JOIN rival AS r ON r.idRival = c.rival
                        WHERE c.idConvocatoria = ?`;

    const [convocatoria] = await conexion.query(consulta,idConvocatoria);    

    return convocatoria;
}


const buscarTodas = async () => {

    const consulta = `SELECT * FROM convocatoria as c INNER JOIN rival AS r ON r.idRival = c.rival`;

    const [convocatorias] = await conexion.query(consulta);    

    return convocatorias;
}

const nueva = async (convocatoria) => {

    const consulta = 'INSERT INTO convocatoria SET ?';
    const [convocatoriaNueva] = await conexion.query(consulta, convocatoria);

    return buscarPorId(convocatoriaNueva.insertId);
}

const modificar = async (dato, idConvocatoria) => {
    const consulta = 'UPDATE convocatoria SET ? WHERE idConvocatoria = ?';
    
    const [result] = await conexion.query(consulta,[dato, idConvocatoria]);
    
    return buscarPorId(idConvocatoria)
}



const eliminar = async(idConvocatoria) =>{
    const consulta = 'DELETE FROM convocatoria WHERE convocatoria.idConvocatoria = ?';
    await conexion.query(consulta, [idConvocatoria]);
}

module.exports = {
    buscarPorId,
    buscarTodas,
    nueva, 
    modificar,
    eliminar,
}
