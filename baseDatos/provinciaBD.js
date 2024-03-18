const conexion = require('./conexionBD');

const buscarPorId = async (idProvincia) => {

    const consulta = `SELECT  idProvincia, nombreProvincia FROM provincias WHERE activo = 1 AND idProvincia = ?`;

    const [provincia] = await conexion.query(consulta,[idProvincia]);    

    return provincia;
}


const buscarTodos = async () => {

    const consulta = `SELECT idProvincia, nombreProvincia FROM provincias WHERE activo = 1`;

    const [provincias] = await conexion.query(consulta);    

    return provincias;
}

module.exports = {
    buscarPorId,
    buscarTodos,
}
