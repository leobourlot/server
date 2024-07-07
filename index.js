const express = require('express');
const cors = require('cors');
var morgan = require('morgan');

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
app.use(cors());


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

//   const upload = multer({ storage: storage });

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
app.use('/api/v1/jugadorTorneo', v1JugadorTorneo); //[passport.authenticate('jwt', { session: false }), esAdministrador], v1FutbolistaConvocatoria);

// app.use('/api/v1/estadistica', [passport.authenticate('jwt', { session: false }), esJugador], v1Estadistica);





app.listen(3005, () => {
    console.log('API AJPP iniciada');
})
