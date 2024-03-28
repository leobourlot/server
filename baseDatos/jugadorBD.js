const conexion = require('./conexionBD')

const buscarPorId = async(idJugador) =>{
    const consulta = `SELECT dni, apellido, nombre, fechaNac, correoElectronico, telefono, localidad 
    FROM jugadores 
    WHERE activo = 1 AND idJugador = ?`;

    const [jugador] = await conexion.query(consulta, idJugador);

    return jugador;
}

const buscarTodos = async () =>{
    
    const consulta = `SELECT idJugador, dni, apellido, nombre, fechaNac, correoElectronico, telefono, localidad 
    FROM jugadores    
    WHERE activo = 1`;

    // Ejecuto la consulta
    const [jugadores] = await conexion.query(consulta);

    return jugadores

}

const eliminar = async(idJugador) =>{
    const consulta = `UPDATE jugadores SET activo = 0 WHERE idJugador = ?`;
    await conexion.query(consulta, [idJugador]);
}

const update = async(jugador, idJugador)=>{
    
    const consulta = `UPDATE jugadores SET ? WHERE idJugador = ?`;
    const [jugadorActualizado] = await conexion.query(consulta, [jugador, idJugador]);

    return buscarPorId(jugadorActualizado.insertId);
}

module.exports = {buscarPorId, buscarTodos, eliminar, update}