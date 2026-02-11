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

const upload = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024 } });

exports.upload = upload.single('foto');

exports.cambiarImagenTorneo = (req, res) => {
    const fotoProximoTorneo = req.file;

    if (!fotoProximoTorneo) {
        return res.status(400).json({ error: 'No se proporcionó ninguna imagen.' });
    }

    const rutaImagenTorneo = path.join(__dirname, 'archivos', 'imagenTorneo.png');

    try {
        if (fs.existsSync(rutaImagenTorneo)) {
            fs.unlinkSync(rutaImagenTorneo);
        }

        try {
            fs.renameSync(fotoProximoTorneo.path, rutaImagenTorneo);
            res.status(200).json({ mensaje: 'Imagen del próximo torneo actualizada correctamente.' });
        } catch (error) {
            console.error('Error al escribir archivo: ', error)
        }
    } catch (error) {
        console.error('Error al actualizar la imagen del próximo torneo:', error);
        res.status(500).json({ error: 'Error interno del servidor al actualizar la imagen del próximo torneo.' });
    }
};

exports.cambiarImagenTorneo2 = (req, res) => {
    const fotoProximoTorneo2 = req.file;

    if (!fotoProximoTorneo2) {
        return res.status(400).json({ error: 'No se proporcionó ninguna imagen.' });
    }

    const rutaImagenTorneo2 = path.join(__dirname, '..', 'archivos', 'imagenTorneo2.png');

    try {
        if (fs.existsSync(rutaImagenTorneo2)) {
            fs.unlinkSync(rutaImagenTorneo2);
        }

        try {
            fs.renameSync(fotoProximoTorneo2.path, rutaImagenTorneo2);
            res.status(200).json({ mensaje: 'Imagen del próximo torneo actualizada correctamente.' });
        } catch (error) {
            console.error('Error al escribir archivo: ', error)
        }
    } catch (error) {
        console.error('Error al actualizar la imagen del próximo torneo:', error);
        res.status(500).json({ error: 'Error interno del servidor al actualizar la imagen del próximo torneo.' });
    }
};

exports.cambiarCalendario1 = (req, res) => {
    const fotoCalendario1 = req.file;

    if (!fotoCalendario1) {
        return res.status(400).json({ error: 'No se proporcionó ninguna imagen.' });
    }

    const rutaImagenCalendario1 = path.join(__dirname, 'archivos', 'calendario1.png');

    try {
        if (fs.existsSync(rutaImagenCalendario1)) {
            fs.unlinkSync(rutaImagenCalendario1);
        }

        try {
            fs.renameSync(fotoCalendario1.path, rutaImagenCalendario1);
            res.status(200).json({ mensaje: 'Imagen del calendario actualizada correctamente.' });
        } catch (error) {
            console.error('Error al escribir archivo: ', error)
        }
    } catch (error) {
        console.error('Error al actualizar la imagen del calendario:', error);
        res.status(500).json({ error: 'Error interno del servidor al actualizar la imagen del calendario.' });
    }
};

exports.cambiarCalendario2 = (req, res) => {
    const fotoCalendario2 = req.file;

    if (!fotoCalendario2) {
        return res.status(400).json({ error: 'No se proporcionó ninguna imagen.' });
    }

    const rutaImagenCalendario2 = path.join(__dirname, 'archivos', 'calendario2.png');

    try {
        if (fs.existsSync(rutaImagenCalendario2)) {
            fs.unlinkSync(rutaImagenCalendario2);
        }

        try {
            fs.renameSync(fotoCalendario2.path, rutaImagenCalendario2);
            res.status(200).json({ mensaje: 'Imagen del calendario actualizada correctamente.' });
        } catch (error) {
            console.error('Error al escribir archivo: ', error)
        }
    } catch (error) {
        console.error('Error al actualizar la imagen del calendario:', error);
        res.status(500).json({ error: 'Error interno del servidor al actualizar la imagen del calendario.' });
    }
};

exports.cambiarCalendario3 = (req, res) => {
    const fotoCalendario3 = req.file;

    if (!fotoCalendario3) {
        return res.status(400).json({ error: 'No se proporcionó ninguna imagen.' });
    }

    const rutaImagenCalendario3 = path.join(__dirname, 'archivos', 'calendario3.png');

    try {
        if (fs.existsSync(rutaImagenCalendario3)) {
            fs.unlinkSync(rutaImagenCalendario3);
        }

        try {
            fs.renameSync(fotoCalendario3.path, rutaImagenCalendario3);
            res.status(200).json({ mensaje: 'Imagen del calendario actualizada correctamente.' });
        } catch (error) {
            console.error('Error al escribir archivo: ', error)
        }
    } catch (error) {
        console.error('Error al actualizar la imagen del calendario:', error);
        res.status(500).json({ error: 'Error interno del servidor al actualizar la imagen del calendario.' });
    }
};

exports.cambiarRanking = (req, res) => {
    const fotoRanking = req.file;

    if (!fotoRanking) {
        return res.status(400).json({ error: 'No se proporcionó ninguna imagen.' });
    }

    const rutaImagenRanking = path.join(__dirname, 'archivos', 'ranking.png');

    try {
        if (fs.existsSync(rutaImagenRanking)) {
            fs.unlinkSync(rutaImagenRanking);
        }

        try {
            fs.renameSync(fotoRanking.path, rutaImagenRanking);
            res.status(200).json({ mensaje: 'Imagen del ranking actualizada correctamente.' });
        } catch (error) {
            console.error('Error al escribir archivo: ', error)
        }
    } catch (error) {
        console.error('Error al actualizar la imagen del ranking:', error);
        res.status(500).json({ error: 'Error interno del servidor al actualizar la imagen del ranking.' });
    }
};

exports.cambiarRankingVertical = (req, res) => {
    const fotoRankingVertical = req.file;

    if (!fotoRankingVertical) {
        return res.status(400).json({ error: 'No se proporcionó ninguna imagen.' });
    }

    const rutaImagenRankingVertical = path.join(__dirname, 'archivos', 'rankingVertical.png');

    try {
        if (fs.existsSync(rutaImagenRankingVertical)) {
            fs.unlinkSync(rutaImagenRankingVertical);
        }

        try {
            fs.renameSync(fotoRankingVertical.path, rutaImagenRankingVertical);
            res.status(200).json({ mensaje: 'Imagen del ranking vertical actualizada correctamente.' });
        } catch (error) {
            console.error('Error al escribir archivo: ', error)
        }
    } catch (error) {
        console.error('Error al actualizar la imagen del ranking vertical:', error);
        res.status(500).json({ error: 'Error interno del servidor al actualizar la imagen del ranking vertical.' });
    }
};

exports.cambiarRankingPdf = (req, res) => {
    // console.log('controlador pdf llamado')
    const rankingPdf = req.file;

    // console.log('rankingPdf: ', rankingPdf)
    if (!rankingPdf) {
        return res.status(400).json({ error: 'No se proporcionó ningun pdf.' });
    }

    const rutaRankingPdf = path.join(__dirname, 'archivos', 'rankingCompleto.pdf');

    try {
        if (fs.existsSync(rutaRankingPdf)) {
            fs.unlinkSync(rutaRankingPdf);
        }

        try {
            fs.renameSync(rankingPdf.path, rutaRankingPdf);
            return res.status(200).json({ mensaje: 'Pdf de ranking actualizado correctamente.' });
        } catch (error) {
            console.error('Error al escribir archivo: ', error)
        }
    } catch (error) {
        console.error('Error al actualizar el pdf de ranking:', error);
        return res.status(500).json({ error: 'Error interno del servidor al actualizar el pdf de ranking.' });
    }
};

exports.handleUploadNoticiaImagen = (req, res) => {
    const idx = req.params.index;
    const file = req.file;
    // console.log('handleUploadNoticiaImagen llamado con idx:', idx, 'y file:', file);
    if (!file) return res.status(400).json({ error: 'No llegó archivo.' });

    // Guarda en carpetas /archivos/imagenesNoticias
    const destDir = path.join(__dirname, 'archivos', 'imagenesNoticias');
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

    const ext = path.extname(file.originalname);
    const finalName = `${Date.now()}_${idx}${ext}`;              // o usa uuid
    const finalPath = path.join(destDir, finalName);

    // elimina anterior si quieres
    fs.renameSync(file.path, finalPath);

    // construye URL pública (recuerda exponer /archivos en express.static)
    const publicUrl = `${process.env.API_BASE_URL}/archivos/imagenesNoticias/${finalName}`;
    res.json({ url: publicUrl });
};