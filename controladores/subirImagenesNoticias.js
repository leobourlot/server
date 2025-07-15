// controladores/subirImagenesNoticias.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Directorio donde se guardarán las imágenes de noticias
const UPLOAD_DIR = path.join(__dirname, '..', 'archivos', 'imagenesNoticias');
// Asegúrate de que exista la carpeta UPLOAD_DIR
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// Configuración de Multer
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, UPLOAD_DIR);
    },
    filename(req, file, cb) {
        // Mantenemos el nombre original o puedes generar uno único:
        cb(null, file.originalname);
    }
});

// Hasta 10 archivos en el campo "archivos"
const upload = multer({ storage }).array('archivos', 10);

// Middleware de subida
uploadImagenesNoticias = upload;

// Controlador que devuelve las URLs públicas
cambiarImagenesNoticias = (req, res) => {
    const files = req.files;
    console.log('Archivos subidos:', files);
    if (!files || files.length === 0) {
        return res.status(400).json({ error: 'No se subió ninguna imagen.' });
    }

    // Construye las URLs de acceso
    console.log('Construyendo URLs para las imágenes subidas...');
    const urls = files.map(f => {
        return `/archivos/imagenesNoticias/${encodeURIComponent(f.filename)}`;
    });

    res.status(200).json({ mensaje: 'Imágenes de noticia subidas correctamente', urls });
};

module.exports = {uploadImagenesNoticias, cambiarImagenesNoticias};