const conexion = require('./conexionBD');
const bcrypt = require('bcrypt');




const buscar = async (dni, clave) => {
    const consulta = `SELECT idJugador, dni, apellido, nombre, fechaNac, correoElectronico, telefono, localidad, tipoUsuario, clave 
                      FROM jugadores 
                      WHERE dni = ? AND activo = 1`;

    const [usuario] = await conexion.query(consulta, [dni]);

    // console.log('usuario en buscarJugador es: ', usuario)

    if (usuario.length === 0) {
        // El jugador no existe o no está activo
        console.log('El usuario no existe')
        return null;
    }

    // console.log('La clave antes de comparar es: ', usuario[0].clave)

    // Verificar si la contraseña coincide usando bcrypt.compare
    const match = await bcrypt.compare(clave, usuario[0].clave);

    // console.log('match es: ', match)

    if (match) {
        // La contraseña es correcta, devolver el usuario
        console.log('contraseña correcta')
        return usuario[0];
    } else {
        // La contraseña es incorrecta
        console.log('contraseña incorrecta')
        return null;
    }
}

const buscarPorId = async (idJugador) => {

    const consulta = `SELECT * FROM jugadores WHERE idJugador = ?`;

    const [jugador] = await conexion.query(consulta, idJugador);

    // console.log('jugador en registroBD buscarPorId es: ', jugador)

    return jugador;
}

const nuevoJugador = async (jugador) => {
    // Extraer la clave del jugador
    const { clave, ...datosJugador } = jugador;

    // Cifrar la clave utilizando bcrypt
    const claveCifrada = await bcrypt.hash(clave, 10); // 10 es el número de rondas de cifrado

    // Construir el objeto de jugador con la clave cifrada
    const jugadorConClaveCifrada = { ...datosJugador, clave: claveCifrada };

    // console.log('jugador en BD es: ', jugadorConClaveCifrada);

    // Realizar la inserción en la base de datos con la clave cifrada
    const consultaJugador = 'INSERT INTO jugadores SET ?';
    const [jugadorNuevo] = await conexion.query(consultaJugador, jugadorConClaveCifrada);

    // console.log('jugadornuevoes en bd: ', jugadorNuevo);
    return buscarPorId(jugadorNuevo.insertId);
}

const buscarPorDNI = async (dni) => {
    // console.log('dni en registroBD es: ', dni)
    const consulta = `SELECT * FROM jugadores WHERE dni = ?`;
    const [jugador] = await conexion.query(consulta, dni);
    // console.log('jugador en registroBd buscarPorDni es: ', jugador)
    return jugador[0]; // Devuelve el primer jugador encontrado o undefined si no hay ninguno
}

module.exports = {
    nuevoJugador,
    buscar,
    buscarPorId,
    buscarPorDNI,
}
