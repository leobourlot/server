const conexion = require('./conexionBD');

const estadistica = async () => {
    const consulta = 'call procEstadistica()';

    const [results] = await conexion.query(consulta);

    console.log(results);

    const futbolistas = results[0][0].cantidadFutbolistas;
    const convocatorias = results[0][0].cantidadConvocatorias;
    const futbolistasActivos = results[0][0].jugadoresActivos;
    const futbolistasRetirados = results[0][0].jugadoresRetirados;
    const arqueros = results[0][0].arqueros;
    const defensores = results[0][0].defensores;
    const mediocampistas = results[0][0].mediocampistas;
    const delanteros = results[0][0].delanteros;

    const datos = {
        futbolistas: futbolistas,
        convocatorias: convocatorias,
        futbolistasActivos: futbolistasActivos,
        futbolistasRetirados: futbolistasRetirados,
        arqueros: arqueros,
        defensores: defensores,
        mediocampistas: mediocampistas,
        delanteros: delanteros,
    }

    // console.log('datos estadistica es: ', datos);

    return datos;
}


module.exports = {
    estadistica
}
