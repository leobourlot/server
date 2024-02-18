const rivalBD = require('../baseDatos/rivalBD');

// retorna el rival, segun el idRival que recibe
buscarPorId = async(req, res) => {
    try{
        const idRival = req.params.idRival;   
        
        if(!idRival) {
            res.status(404).json({estado:'FALLO', msj:'Falta el id del rival que quiere buscar'});
        }

        const rival = await rivalBD.buscarPorId(idRival);

        res.json({estado:'OK', dato:rival});

    }catch (exec){
        throw exec;
    }
}

// retorna todos los rivales activos
buscarTodos = async(req, res) => {
    try{
        const rivales = await rivalBD.buscarTodos();
        res.json({estado:'OK', dato:rivales});
    }catch (exec){
        throw exec;
    }
}

module.exports = {
    buscarPorId,
    buscarTodos,
}