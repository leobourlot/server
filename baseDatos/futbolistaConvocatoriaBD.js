const conexion = require('./conexionBD');

const buscarPorId = async (idFutbolistaConvocatoria) => {

    const consulta = `SELECT fc.*, f.idFutbolista, f.dni, f.nombre, f.apellido, f.apodo, f.foto,
    (CASE 
        WHEN f.posicion = 0 THEN 'Arq'
        WHEN f.posicion = 1 THEN 'Def'
        WHEN f.posicion = 2 THEN 'Med'
        WHEN f.posicion = 3 THEN 'Del'
        ELSE ''
    END) AS posicion,
    (CASE
        WHEN f.pieHabil = 0 THEN 'Diestro'
        WHEN f.pieHabil = 1 THEN 'Zurdo'
        ELSE ''
    END) AS pieHabil
        FROM futbolistaConvocatoria AS fc
        INNER JOIN futbolista AS f ON fc.futbolista = f.idFutbolista
        WHERE fc.convocatoria = ?`;

    const [futbolistaConvocatoria] = await conexion.query(consulta, idFutbolistaConvocatoria);

    return futbolistaConvocatoria;
}

const buscarTodas = async () => {

    const consulta = `SELECT * FROM futbolistaConvocatoria as fc 
                        INNER JOIN convocatoria AS c ON c.idConvocatoria = fc.convocatoria
                        INNER JOIN futbolista AS f ON f.idFutbolista = fc.futbolista`;

    const [convocatorias] = await conexion.query(consulta);

    return convocatorias;
}

const agregarConvocados = async (futbolistaConvocatoria) => {

    const consulta = 'INSERT INTO futbolistaConvocatoria SET ?';
    const [futbolistaConvocatoriaNueva] = await conexion.query(consulta, futbolistaConvocatoria);

    return buscarPorId(futbolistaConvocatoriaNueva.insertId);
}

const agregarTitulares = async (dato, idConvocatoria) => {
    const jugadoresTitulares = [dato.esTitular, ...dato.jugadoresTitulares]; // Agregar dato.esTitular al inicio

    const marcadores = jugadoresTitulares.map(() => '?').join(', '); // Crear una cadena de marcadores de posición
    const consulta = `UPDATE futbolistaConvocatoria SET esTitular = (CASE 
        WHEN futbolista IN (${marcadores}) THEN 1 ELSE 0 END),
        esCapitan = (CASE 
            WHEN futbolista = ? THEN ? ELSE 0 END)
            WHERE convocatoria = ?`;

    const valores = [...jugadoresTitulares, dato.capitan, dato.esCapitan, idConvocatoria]; // Combinar valores y agregar idConvocatoria al final

    const [result] = await conexion.query(consulta, valores);

    return buscarPorId(idConvocatoria);
    
}

module.exports = {
    buscarPorId,
    agregarConvocados,
    buscarTodas,
    agregarTitulares,
}