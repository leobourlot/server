const jwt = require('jsonwebtoken');
const passport = require("passport");
require('dotenv').config();

login = async (req, res) => {
    passport.authenticate('local', { session: false }, (err, usuario, info) => {
        // console.log('req en auth del controlador es: ', req)
        // console.log('res en auth del controlador es: ', res)
        // console.log('usuario en controlador auth es: ', usuario)
        if (err || !usuario) {
            return res.status(400).json({estado:'FALLO', msj:info});
        }

        // si existe el usuario, armo el token
        req.login(usuario, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }
            
            const token = jwt.sign(usuario, process.env.JWT_SECRET);
            return res.json({ usuario, token });
        });
    })(req, res);
};

module.exports = { login };