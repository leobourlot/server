const multer = require('multer');
const path = require('path');
const fs = require('fs');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'archivos'); // Ruta de la carpeta donde deseas guardar las imágenes
    },
    filename: function (req, file, cb) {
        cb(null, 'proximoTorneo.png'); // Establece el nombre del archivo como "proximoTorneo.png"
    }
});

const upload = multer({ storage: storage });

exports.upload = upload.single('foto');

// Ruta para cambiar la imagen del próximo torneo
exports.cambiarImagenTorneo = (req, res) => {
    const fotoProximoTorneo = req.file;

    // console.log('fotoProximoTorneo en el controlador es: ', fotoProximoTorneo)

    if (!fotoProximoTorneo) {
        return res.status(400).json({ error: 'No se proporcionó ninguna imagen.' });
    }

    // Ruta donde se guarda la imagen del próximo torneo
    const rutaImagenTorneo = path.join(__dirname, '..', 'archivos', 'imagenTorneo.png');

    try {
        // Verifica si ya existe una imagen del próximo torneo
        if (fs.existsSync(rutaImagenTorneo)) {
            // Si existe, elimina la imagen anterior
            fs.unlinkSync(rutaImagenTorneo);
        }

        // Guarda la nueva imagen con el mismo nombre de archivo fijo
        try{
        fs.renameSync(fotoProximoTorneo.path, rutaImagenTorneo);
        

        res.status(200).json({ mensaje: 'Imagen del próximo torneo actualizada correctamente.' });
        } catch (error){
            console.error ('Error al escribir archivo: ', error)
        }        
    } catch (error) {
        console.error('Error al actualizar la imagen del próximo torneo:', error);
        res.status(500).json({ error: 'Error interno del servidor al actualizar la imagen del próximo torneo.' });
    }
};