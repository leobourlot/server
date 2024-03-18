const passport = require('passport');
const passportJWT = require("passport-jwt");
const registroBD = require('./../baseDatos/registroBD');
require('dotenv').config();

const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;

//Defino como se validan los usuarios en la estrategia local
passport.use(new LocalStrategy({
        usernameField: 'dni',
        passwordField: 'clave'
    }, 
    
    async (dni, clave, cb) => {
        // console.log('usernameField en passport es: ', usernameField);
        // console.log('passwordField en passport es: ', passwordField);
        // console.log('dni en passport es: ', dni);
        // console.log('clave en passport es: ', clave);
        try {
            const usuario = await registroBD.buscar(dni, clave);
            console.log('usuario en passport es: ', usuario) 
            if (!usuario) {
                return cb(null, false, { message: 'Nombre de usuario y/o contraseña incorrectos.' });
            } else {
                return cb(null, usuario, { message: 'Login correcto!' });
            }
        } catch (exc) {
            cb(exc);
        }
    }
));

//Defino como se validan los tokens que recibimos 
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET 
}, 
    async (jwtPayload, cb) => {
        console.log(jwtPayload)
        const usuario = await registroBD.buscarPorId(jwtPayload.idUsuario); 
        if (usuario) {
            return cb(null, usuario);
        } else {
            return cb(null, false, { message: 'Token incorrecto.' });
        }
    }
));