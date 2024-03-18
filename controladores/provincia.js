const provinciaBD = require('../baseDatos/provinciaBD');

// retorna el rival, segun el idRival que recibe
buscarPorId = async(req, res) => {
    try{
        const idProvincia = req.params.idProvincia;   
        // console.log('idProvincia en el controlador es: ', idProvincia)
        if(!idProvincia) {
            res.status(404).json({estado:'FALLO', msj:'Falta el id de la provincia que quiere buscar'});
        }

        const provincia = await provinciaBD.buscarPorId(idProvincia);

        res.json({estado:'OK', dato:provincia})
        // console.log('provincia en el controlador es: ', provincia);
        // console.log('nombreProvincia en el controlador es: ', provincia[0].nombreProvincia);

    }catch (exec){
        throw exec;
    }
}

// retorna todos los rivales activos
buscarTodos = async(req, res) => {
    try{
        const provincias = await provinciaBD.buscarTodos();
        res.json({estado:'OK', dato:provincias});
    }catch (exec){
        throw exec;
    }
}

module.exports = {
    buscarPorId,
    buscarTodos,
}