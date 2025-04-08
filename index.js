const express = require('express');
const cors = require('cors');
var morgan = require('morgan');
const session = require('express-session');
// const axios = require('axios');



const multer = require('multer');

var fs = require('fs');
var path = require('path');
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('short'));
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));
const corsOptions = {
    // origin: 'http://localhost:3000', // El origen que necesitas permitir
    origin: 'https://www.ajppargentina.com.ar', // El origen que necesitas permitir
    credentials: true
};
app.use(cors(corsOptions));


app.use(express.static(path.join(__dirname, 'public_html')));
// Configura multer para manejar la carga de imágenes
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'ruta/a/tu/carpeta'); // Ruta de la carpeta donde deseas guardar las imágenes
//     },
//     filename: (req, file, cb) => {
//       const extname = path.extname(file.originalname);
//       const filename = 'imagen_' + Date.now() + extname; // Nombre único basado en la marca de tiempo
//       cb(null, filename);
//     },
//   });

// Servir archivos estáticos desde el directorio 'public'
app.use(express.static(path.join(__dirname, 'public')));

//   const upload = multer({ storage: storage });
// app.use((req, res, next) => {
//     res.setHeader(
//         "Content-Security-Policy",
//         "default-src 'self' https://cdn.ngrok.com 'unsafe-inline' 'unsafe-eval'; font-src 'self' https://assets.ngrok.com https://cdn.ngrok.com;"
//     );
//     next();
// });

app.set('trust proxy', 1);
app.use(session({
    secret: '1234', // Cambia esto por una cadena segura
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // true si usas HTTPS en producción
        maxAge: 600000, // duración en milisegundos (opcional)
        sameSite: 'none'
    }
}));

app.get('/', (req, res) => {
    // console.log('hubo get');

    const saludo = 'Hola bienvenido'

    res.status(200).json({ saludo });

})

// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'public_html', 'index.html'));
// });

const { esAdministrador } = require('./middleware/esAdministrador');
const { esJugador } = require('./middleware/esJugador');
// const { esJugador } = require('./middleware/esJugador');

// configuracion de passport
const passport = require("passport");
require('./config/passport');

app.get('/archivos/:nombreArchivo', (req, res) => {
    const nombreArchivo = req.params.nombreArchivo;
    res.sendFile(path.join(__dirname, 'archivos', nombreArchivo));
});



//rutas de la api
const v1Publico = require('./v1/rutas/publico');
const v1Jugador = require('./v1/rutas/jugador');
const v1Provincia = require('./v1/rutas/provincia');
const v1Torneo = require('./v1/rutas/torneo');
const v1Auth = require('./v1/rutas/auth');
const v1Registro = require('./v1/rutas/registro');
const v1JugadorTorneo = require('./v1/rutas/jugadorTorneo');
const v1Archivos = require('./v1/rutas/archivos');
const v1Noticia = require('./v1/rutas/noticia');
const v1Pagos = require('./v1/rutas/pagos');
const v1Oauth = require('./v1/rutas/oauth');
const v1Organizador = require('./v1/rutas/organizador');

// const v1Estadistica = require('./v1/rutas/estadistica');


//middleware
app.use('/api/v1/publico', v1Publico);
app.use('/api/v1/jugador', v1Jugador);
// app.use('/api/v1/convocatoria', [passport.authenticate('jwt', { session: false }), esAdministrador], v1Convocatoria);
app.use('/api/v1/torneo', v1Torneo); //[passport.authenticate('jwt', { session: false }), esAdministrador], v1Torneo);
app.use('/api/v1/provincia', v1Provincia);
app.use('/api/v1/auth', v1Auth);
app.use('/api/v1/registro', v1Registro);
app.use('/api/v1/archivo', v1Archivos);
app.use('/api/v1/noticia', v1Noticia);
app.use('/api/v1/pagos', v1Pagos);
app.use('/api/v1/oauth', v1Oauth);
app.use('/api/v1/organizador', v1Organizador);
app.use('/api/v1/jugadorTorneo', v1JugadorTorneo); //[passport.authenticate('jwt', { session: false }), esAdministrador], v1FutbolistaConvocatoria);

// app.use('/api/v1/estadistica', [passport.authenticate('jwt', { session: false }), esJugador], v1Estadistica);



const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Escucha conexiones desde el frontend
io.on('connection', (socket) => {
    console.log('Frontend conectado');
});

app.set('socketio', io);
server.listen(3005, '0.0.0.0', () => {
    console.log('API AJPP iniciada con Socket.IO');
});

// app.listen(3005, () => {
//     console.log('API AJPP iniciada');
// })


