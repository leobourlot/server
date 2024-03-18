// const { inscripcion } = require('../controladores/jugadorTorneo');
const conexion = require('./conexionBD');

const buscarPorId = async (idJugadorTorneo) => {

    const consulta = `SELECT jt.*, j1.idJugador AS idJugador1, j1.dni AS dniJugador1, j1.nombre AS nombreJugador1, j1.fechaNac AS fechaNacJugador1, j1.apellido AS apellidoJugador1, j1.correoElectronico AS correoElectronicoJugador1, j1.telefono AS telefonoJugador1, j1.localidad AS localidadJugador1,
    j2.idJugador AS idJugador2, j2.dni AS dniJugador2, j2.nombre AS nombreJugador2, j2.apellido AS apellidoJugador2, j2.fechaNac AS fechaNacJugador2, j2.correoElectronico AS correoElectronicoJugador2, j2.telefono AS telefonoJugador2, j2.localidad AS localidadJugador2
    FROM jugadoresTorneos AS jt
    INNER JOIN jugadores AS j1 ON jt.jugador1 = j1.idJugador
    INNER JOIN jugadores AS j2 ON jt.jugador2 = j2.idJugador
    WHERE jt.idJugadoresTorneos = ?`;

    const [jugadorTorneo] = await conexion.query(consulta, idJugadorTorneo);

    return jugadorTorneo;
}

const buscarInscriptos = async (idTorneo) => {
    const consulta = `
        SELECT jt.*, j1.idJugador AS idJugador1, j1.dni AS dniJugador1, j1.nombre AS nombreJugador1, j1.apellido AS apellidoJugador1, j1.fechaNac AS fechaNacJugador1, j1.correoElectronico AS correoElectronicoJugador1, j1.telefono AS telefonoJugador1, j1.localidad AS localidadJugador1,
        j2.idJugador AS idJugador2, j2.dni AS dniJugador2, j2.nombre AS nombreJugador2, j2.apellido AS apellidoJugador2, j2.fechaNac AS fechaNacJugador2, j2.correoElectronico AS correoElectronicoJugador2, j2.telefono AS telefonoJugador2, j2.localidad AS localidadJugador2
        FROM jugadoresTorneos AS jt
        INNER JOIN jugadores AS j1 ON jt.jugador1 = j1.idJugador
        INNER JOIN jugadores AS j2 ON jt.jugador2 = j2.idJugador
        WHERE jt.torneo = ?`;
        
    const [jugadoresInscritos] = await conexion.query(consulta, idTorneo);

    return jugadoresInscritos;
}

const buscarTodas = async () => {

    const consulta = `SELECT * FROM jugadoresTorneos as jt 
                        INNER JOIN torneo AS t ON t.idTorneo = jt.torneo
                        INNER JOIN jugadores AS j ON j.idJugador1 = jt.jugador1 AND j.idJugador2 = jt.jugador2`;

    const [jugadorTorneos] = await conexion.query(consulta);

    return jugadorTorneos;
}

const agregarInscripto = async (inscripcion) => {

    try {
        const consulta = 'INSERT INTO jugadoresTorneos SET ?';
        const [jugadorTorneoNuevo] = await conexion.query(consulta, inscripcion);

        console.log('inscripcion en bd es: ', inscripcion);
        const resultado = await buscarPorId(jugadorTorneoNuevo.insertId);
        console.log('buscarPorID en bd es:', resultado);

        return resultado;
    } catch (error) {
        console.error('Error:', error);
        throw error; // Asegúrate de manejar el error correctamente en el código que llama a esta función
    }
}

const buscarPorJugadorYTorneo = async (idJugador1, idjugador2, idTorneo) => {
    const consulta = 'SELECT * FROM jugadoresTorneos WHERE jugador1 = ? OR jugador2 = ? AND torneo = ?';
    const [resultado] = await conexion.query(consulta, [idJugador1, idjugador2, idTorneo]);
    return resultado.length > 0; // Devuelve true si el jugador está inscrito en el torneo, false de lo contrario
}

const buscarMisInscriptos = async (idJugador) => {
    console.log('idJugador en BD es: ', idJugador)
    const consulta = `SELECT torneos.* FROM torneos 
                    INNER JOIN jugadoresTorneos ON torneos.idTorneo = jugadoresTorneos.torneo 
                    WHERE jugadoresTorneos.jugador1 = ? OR jugadoresTorneos.jugador2 = ?`;
    const [resultado] = await conexion.query(consulta, [idJugador, idJugador]);
    return resultado;
}

const eliminar = async (idJugadorTorneo) => {
    console.log('idJugadorTorneo en eliminar de bd es: ', idJugadorTorneo)
    try {
        
        const consulta = 'DELETE FROM jugadoresTorneos WHERE jugadoresTorneos.idJugadoresTorneos = ?';
        await conexion.query(consulta, [idJugadorTorneo]);
    } catch (error) {
        console.error('Error al eliminar el torneo: ', error)
    }
}

module.exports = {
    buscarPorId,
    agregarInscripto,
    buscarTodas,
    buscarPorJugadorYTorneo,
    buscarInscriptos,
    eliminar,
    buscarMisInscriptos
}