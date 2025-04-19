const crypto = require('crypto');

// Usamos la clave en formato hexadecimal
const ENCRYPT_KEY = process.env.ENCRYPT_KEY; // Debe ser de 64 caracteres hexadecimales (32 bytes)
const IV_LENGTH = 16; // La longitud del IV para AES (16 bytes)

function encrypt(text) {
    // Genera un IV aleatorio
    const iv = crypto.randomBytes(IV_LENGTH);
    // Convertimos la clave en Buffer desde hexadecimal:
    const key = Buffer.from(ENCRYPT_KEY, 'hex');
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    // Almaceno el IV junto al valor encriptado para poder desencriptarlo luego.
    return iv.toString('hex') + ':' + encrypted;
}

function decrypt(text) {
    const [ivHex, encryptedText] = text.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const key = Buffer.from(ENCRYPT_KEY, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

module.exports = { encrypt, decrypt };
