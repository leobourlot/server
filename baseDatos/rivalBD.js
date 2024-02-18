const conexion = require('./conexionBD');

const buscarPorId = async (idRival) => {

    const consulta = `SELECT  idRival, nombreRival FROM rival WHERE activo = 1 AND idRival = ?`;

    const [rival] = await conexion.query(consulta,idRival);    

    return rival;
}


const buscarTodos = async () => {

    const consulta = `SELECT idRival, nombreRival FROM rival WHERE activo = 1`;

    const [rivales] = await conexion.query(consulta);    

    return rivales;
}

module.exports = {
    buscarPorId,
    buscarTodos,
}
