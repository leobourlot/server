const conexion = require('./conexionBD');
const { decrypt } = require('../controladores/encrypt');


const buscarPorId = async (idOrganizador) => {

    const consulta = `SELECT * FROM organizadores WHERE idOrganizador = ?`;

    const [organizador] = await conexion.query(consulta, [idOrganizador]);

    return organizador;
}


// `SELECT * FROM torneos as c
//     INNER JOIN provincias AS p ON p.idProvincia = t.provincia
//     WHERE t.idTorneo = ?`;
// `SELECT * FROM convocatoria as c
//                         INNER JOIN rival AS r ON r.idRival = c.rival
//                         WHERE c.idConvocatoria = ?`;

//                         

const buscarTodos = async () => {

    const consulta = `SELECT * FROM organizadores`;

    const [organizadores] = await conexion.query(consulta);

    return organizadores;
}

const nuevo = async (organizador) => {

    const consulta = 'INSERT INTO organizadores SET ?';
    const [organizadorNuevo] = await conexion.query(consulta, organizador);

    return buscarPorId(organizadorNuevo.insertId);
}

const modificar = async (dato, idOrganizador) => {
    try {
        // console.log('Datos recibidos para modificar:', dato);
        const consulta = 'UPDATE organizadores SET ? WHERE idOrganizador = ?';

        const [result] = await conexion.query(consulta, [dato, idOrganizador]);

        return buscarPorId(idOrganizador)
    } catch (error) {
        console.error('Error al modificar el organizador: ', error)
    }
}

const actualizarToken = async (idOrganizador, tokenData) => {
    const consulta = `UPDATE organizadores 
                      SET access_token = ?, refresh_token = ?, expires_in = ?, user_id = ?, public_key = ?, live_mode = ?
                      WHERE idOrganizador = ?`;
    const params = [
        tokenData.access_token,
        tokenData.refresh_token,
        tokenData.expires_in,
        tokenData.user_id,
        tokenData.public_key,
        tokenData.live_mode,
        idOrganizador
    ];
    const [resultado] = await conexion.query(consulta, params);
    return resultado;
};

const eliminar = async (idOrganizador) => {
    // console.log('idOrganizador en eliminar de bd es: ', idOrganizador)
    try {

        const consulta = 'DELETE FROM organizadores WHERE organizadores.idOrganizador = ?';
        await conexion.query(consulta, [idOrganizador]);
    } catch (error) {
        console.error('Error al eliminar el organizador: ', error)
    }
}

const guardarOAuthData = async (idOrganizador, { state, code_verifier }) => {
    try {
        const consulta = `UPDATE organizadores 
                        SET oauthState = ?, oauthCodeVerifier = ? 
                        WHERE idOrganizador = ?`;
        const params = [state, code_verifier, idOrganizador];
        const [resultado] = await conexion.query(consulta, params);
        return resultado;
    } catch (error) {
        console.error('Error al guardar datos OAuth:', error);
        throw error;
    }
};

const obtenerOAuthDataPorState = async (state) => {
    try {
        const consulta = `SELECT idOrganizador, oauthCodeVerifier 
                        FROM organizadores 
                        WHERE oauthState = ?`;
        const [resultados] = await conexion.query(consulta, [state]);
        // Suponemos que cada state es único, por lo que devolvemos el primer resultado (si existe)
        return resultados.length > 0 ? resultados[0] : null;
    } catch (error) {
        console.error('Error al obtener datos OAuth por state:', error);
        throw error;
    }
};

const obtenerToken = async (idOrganizador) => {
    try {
        const consulta = `SELECT access_token FROM organizadores WHERE idOrganizador = ?`;
        const [resultado] = await conexion.query(consulta, [idOrganizador]);

        // Verificamos si se encontró el organizador
        if (resultado.length === 0) {
            throw new Error('Organizador no encontrado');
        }

        const resultadoDesencriptado = decrypt(resultado[0].access_token);
        // Retornamos solo el token
        return resultadoDesencriptado
    } catch (error) {
        console.error('Error al obtener el token del organizador:', error);
        throw error;
    }
};

module.exports = {
    buscarPorId,
    buscarTodos,
    nuevo,
    modificar,
    eliminar,
    actualizarToken,
    guardarOAuthData,
    obtenerOAuthDataPorState,
    obtenerToken
}
