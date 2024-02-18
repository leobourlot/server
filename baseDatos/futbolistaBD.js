const conexion = require('./conexionBD')

const buscarPorId = async(idFutbolista) =>{
    const consulta = `SELECT dni, nombre, apellido,
    (CASE
        WHEN posicion = 0 THEN 'Arq'
        WHEN posicion = 1 THEN 'Def'
        WHEN posicion = 2 THEN 'Med'
        WHEN posicion = 3 THEN 'Del'
        ELSE ''
    END) AS posicion,
    (CASE
        WHEN pieHabil = 0 THEN 'Diestro'
        WHEN pieHabil = 1 THEN 'Zurdo'
        ELSE ''
    END) AS pieHabil 
    FROM futbolista 
    WHERE activo = 1 AND idFutbolista = ?`;

    const [futbolista] = await conexion.query(consulta, idFutbolista);

    return futbolista;
}

const buscarTodos = async () =>{
    
    const consulta = `SELECT idFutbolista, dni, nombre, apellido, apodo, foto,
    (CASE
        WHEN posicion = 0 THEN 'Arq'
        WHEN posicion = 1 THEN 'Def'
        WHEN posicion = 2 THEN 'Med'
        WHEN posicion = 3 THEN 'Del'
        ELSE ''
    END) AS posicion,
    (CASE
        WHEN pieHabil = 0 THEN 'Diestro'
        WHEN pieHabil = 1 THEN 'Zurdo'
        ELSE ''
    END) AS pieHabil 
    FROM futbolista 
    WHERE activo = 1`;
  
    // Ejecuto la consulta
    const [futbolistas] = await conexion.query(consulta);
  
    return futbolistas
  
   
}
  
const eliminar = async(idFutbolista) =>{
    const consulta = `UPDATE futbolista SET activo = 0 WHERE idFutbolista = ?`;
    await conexion.query(consulta, [idFutbolista]);
}


const nuevo = async(futbolista)=>{
    
    const consulta = `INSERT INTO futbolista SET ?`;
    const [futbolistaNuevo] = await conexion.query(consulta, futbolista);

    return buscarPorId(futbolistaNuevo.insertId);
}

const update = async(futbolista,idfutbolista)=>{
    
    const consulta = `UPDATE futbolista SET ? WHERE idFutbolista = ?`;
    const [futbolistaActualizado] = await conexion.query(consulta, [futbolista, idfutbolista]);

    return buscarPorId(futbolistaActualizado.insertId);
}

module.exports = {buscarPorId, buscarTodos, eliminar, nuevo, update}