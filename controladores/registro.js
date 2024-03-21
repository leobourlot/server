const registroBD = require('../baseDatos/registroBD');

nuevoJugador = async (req, res) => {

    const { dni, apellido, nombre, fechaNac, correoElectronico, telefono, localidad, clave } = req.body;

    const dniRegex = /^\d{1,8}$/;
    if (!dniRegex.test(dni)) {
        console.log('ingrese solo numeros o menos de 9 digitos')
        return res.status(400).json({ estado: 'FALLO', msj: 'El DNI debe tener 8 caracteres como máximo y ser solo números' });
    }

    console.log('dni en el controlador es: ', dni)
    console.log('apellido en el controlador es: ', apellido)
    console.log('nombre en el controlador es: ', nombre)
    console.log('fechaNac en el controlador es: ', fechaNac)
    console.log('correoelectronico en el controlador es: ', correoElectronico)
    console.log('telefono en el controlador es: ', telefono)
    console.log('localidad en el controlador es: ', localidad)
    console.log('clave en el controlador es: ', clave)



    if (!dni || !apellido || !nombre || !fechaNac || !correoElectronico || !telefono) {
        res.status(404).json({ estado: 'FALLO', msj: 'faltan datos requeridos' });
    } else {
        // Verificar si ya existe un jugador con el mismo DNI
        const jugadorExistente = await registroBD.buscarPorDNI(dni);
        if (jugadorExistente) {
            return res.status(400).json({ estado: 'FALLO', msj: 'Ya existe un jugador con este DNI' });
        }

        // Si no hay un jugador con el mismo DNI, procedemos a crear el nuevo jugador

        // const telefonoInt = parseInt(telefono);
        
        const jugador = {
            dni: dni,
            apellido: apellido,
            nombre: nombre,
            fechaNac: fechaNac,
            correoElectronico: correoElectronico,
            telefono: telefono,
            localidad: localidad,
            clave: clave,
        }

        console.log('jugador antes del await: ', jugador)
        try {
            const nuevoJugador = await registroBD.nuevoJugador(jugador);
            // const nuevoUsuario = await registroBD.nuevoUsuario(jugador);
            res.status(201).json({ estado: 'OK', msj: 'Usuario creado con éxito', dato: (nuevoJugador) });
        } catch (exec) {
            throw exec;
        }
    }

}

module.exports = {
    nuevoJugador,

}

