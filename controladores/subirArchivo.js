const fs = require('fs');
const path = require('path');
const multer = require('multer');

/**
 * DIRECTORIO PERSISTENTE DE UPLOADS
 * Coincide con el volumen montado en EasyPanel: /app/archivos
 */
const UPLOADS_DIR = path.join(__dirname, '..', 'archivos');

/**
 * Asegurar que exista el directorio de uploads
 */
function ensureUploadsDir() {
    if (!fs.existsSync(UPLOADS_DIR)) {
        fs.mkdirSync(UPLOADS_DIR, { recursive: true });
    }
}

/**
 * CONFIGURACIÓN DE MULTER
 * Guarda SIEMPRE en /app/archivos
 */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        ensureUploadsDir();
        cb(null, UPLOADS_DIR);
    },
    filename: function (req, file, cb) {
        // Se guarda con el nombre original (luego se renombra si hace falta)
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

/**
 * UTILIDAD PARA REEMPLAZAR ARCHIVO
 */
function replaceFile(tempPath, finalName) {
    const finalPath = path.join(UPLOADS_DIR, finalName);

    if (fs.existsSync(finalPath)) {
        fs.unlinkSync(finalPath);
    }

    fs.renameSync(tempPath, finalPath);
}

/* =========================
   CONTROLADORES
   ========================= */

exports.uploadSingle = upload.single('archivo');

/**
 * Imagen Torneo
 */
exports.cambiarImagenTorneo = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No se proporcionó ninguna imagen.' });
        }

        replaceFile(req.file.path, 'imagenTorneo.png');

        return res.status(200).json({
            mensaje: 'Imagen del torneo actualizada correctamente.'
        });
    } catch (error) {
        console.error('Error al escribir archivo:', error);
        return res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

/**
 * Imagen Torneo 2
 */
exports.cambiarImagenTorneo2 = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No se proporcionó ninguna imagen.' });
        }

        replaceFile(req.file.path, 'imagenTorneo2.png');

        return res.status(200).json({
            mensaje: 'Imagen del torneo 2 actualizada correctamente.'
        });
    } catch (error) {
        console.error('Error al escribir archivo:', error);
        return res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

/**
 * Calendario 1
 */
exports.cambiarCalendario1 = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No se proporcionó ninguna imagen.' });
        }

        replaceFile(req.file.path, 'calendario1.png');

        return res.status(200).json({
            mensaje: 'Calendario 1 actualizado correctamente.'
        });
    } catch (error) {
        console.error('Error al escribir archivo:', error);
        return res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

/**
 * Calendario 2
 */
exports.cambiarCalendario2 = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No se proporcionó ninguna imagen.' });
        }

        replaceFile(req.file.path, 'calendario2.png');

        return res.status(200).json({
            mensaje: 'Calendario 2 actualizado correctamente.'
        });
    } catch (error) {
        console.error('Error al escribir archivo:', error);
        return res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

/**
 * Calendario 3
 */
exports.cambiarCalendario3 = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No se proporcionó ninguna imagen.' });
        }

        replaceFile(req.file.path, 'calendario3.png');

        return res.status(200).json({
            mensaje: 'Calendario 3 actualizado correctamente.'
        });
    } catch (error) {
        console.error('Error al escribir archivo:', error);
        return res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

/**
 * Ranking Horizontal (imagen)
 */
exports.cambiarRanking = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No se proporcionó ninguna imagen.' });
        }

        replaceFile(req.file.path, 'ranking.png');

        return res.status(200).json({
            mensaje: 'Ranking actualizado correctamente.'
        });
    } catch (error) {
        console.error('Error al escribir archivo:', error);
        return res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

/**
 * Ranking Vertical (imagen)
 */
exports.cambiarRankingVertical = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No se proporcionó ninguna imagen.' });
        }

        replaceFile(req.file.path, 'rankingVertical.png');

        return res.status(200).json({
            mensaje: 'Ranking vertical actualizado correctamente.'
        });
    } catch (error) {
        console.error('Error al escribir archivo:', error);
        return res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

/**
 * Ranking PDF
 */
exports.cambiarRankingPdf = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No se proporcionó ningún PDF.' });
        }

        replaceFile(req.file.path, 'rankingCompleto.pdf');

        return res.status(200).json({
            mensaje: 'PDF de ranking actualizado correctamente.'
        });
    } catch (error) {
        console.error('Error al escribir archivo:', error);
        return res.status(500).json({ error: 'Error interno del servidor.' });
    }
};
