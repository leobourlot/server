// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'archivos'); // Ruta de la carpeta donde deseas guardar las imágenes
//     },
//     filename: function (req, file, cb) {
//         cb(null, 'proximoTorneo.png'); // Establece el nombre del archivo como "proximoTorneo.png"
//     }
// });

// const upload = multer({ storage: storage });

// exports.upload = upload.single('foto');

// // Ruta para cambiar la imagen del próximo torneo
// exports.cambiarImagenTorneo = (req, res) => {
//     const fotoProximoTorneo = req.file;

//     // console.log('fotoProximoTorneo en el controlador es: ', fotoProximoTorneo)

//     if (!fotoProximoTorneo) {
//         return res.status(400).json({ error: 'No se proporcionó ninguna imagen.' });
//     }

//     // Ruta donde se guarda la imagen del próximo torneo
//     const rutaImagenTorneo = path.join(__dirname, '..', 'archivos', 'imagenTorneo.png');

//     try {
//         // Verifica si ya existe una imagen del próximo torneo
//         if (fs.existsSync(rutaImagenTorneo)) {
//             // Si existe, elimina la imagen anterior
//             fs.unlinkSync(rutaImagenTorneo);
//         }

//         // Guarda la nueva imagen con el mismo nombre de archivo fijo
//         try{
//         fs.renameSync(fotoProximoTorneo.path, rutaImagenTorneo);


//         res.status(200).json({ mensaje: 'Imagen del próximo torneo actualizada correctamente.' });
//         } catch (error){
//             console.error ('Error al escribir archivo: ', error)
//         }        
//     } catch (error) {
//         console.error('Error al actualizar la imagen del próximo torneo:', error);
//         res.status(500).json({ error: 'Error interno del servidor al actualizar la imagen del próximo torneo.' });
//     }
// };

const multer = require('multer');
const path = require('path');
const fs = require('fs');

const UPLOAD_DIR = path.join(__dirname, '..', 'archivos');

const FILE_MAP = {
    proximoTorneo: 'imagenTorneo.png',
    proximoTorneo2: 'imagenTorneo2.png',
    calendario1: 'calendario1.png',
    calendario2: 'calendario2.png',
    calendario3: 'calendario3.png',
    ranking: 'ranking.png',
    rankingVertical: 'rankingVertical.png',
    rankingCompleto: 'rankingCompleto.pdf'
};

// Multer storage dinámico en base a req.params.tipo
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, UPLOAD_DIR);
    },
    filename(req, file, cb) {
        const tipo = req.params.tipo;
        const target = FILE_MAP[tipo];
        if (!target) return cb(new Error(`Tipo "${tipo}" no válido`));
        // Subes primero a un nombre temporal para luego renombrar
        cb(null, `.tmp_${tipo}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });

exports.uploadFile = upload.single('foto');            // usas campo 'foto' como antes

exports.handleUpload = (req, res) => {
    const tipo = req.params.tipo;
    const targetName = FILE_MAP[tipo];
    if (!targetName) {
        return res.status(400).json({ error: 'Tipo de archivo no soportado.' });
    }
    if (!req.file) {
        return res.status(400).json({ error: 'No se subió ningún archivo.' });
    }

    const tmpPath = req.file.path;
    const finalPath = path.join(UPLOAD_DIR, targetName);

    try {
        // elimina la versión anterior
        if (fs.existsSync(finalPath)) fs.unlinkSync(finalPath);
        // mueve/renombra la subida temporal al nombre fijo
        fs.renameSync(tmpPath, finalPath);
        return res.json({ mensaje: `Archivo "${targetName}" actualizado correctamente.` });
    } catch (err) {
        console.error('Error al mover el archivo:', err);
        return res.status(500).json({ error: 'Error interno al guardar el archivo' });
    }
};