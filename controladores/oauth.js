const crypto = require('crypto');
const axios = require('axios');
const organizadorBD = require('../baseDatos/organizadorBD')


function generateCodeVerifier() {
    return crypto.randomBytes(32).toString('hex'); // 64 caracteres hexadecimales
}

function base64urlEncode(buffer) {
    return buffer.toString('base64')
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}

function generateCodeChallenge(code_verifier) {
    const hash = crypto.createHash('sha256').update(code_verifier).digest();
    return base64urlEncode(hash);
}


const code_challenge_method = 'S256'; // O "Plain" si se desea


const iniciarOAuth = async (req, res) => {
    try {
        const idOrganizador = req.params.idOrganizador;
        console.log('organizadorId en iniciar es: ', idOrganizador)
        if (idOrganizador) {
            req.session.idOrganizador = idOrganizador;
        }

        const code_verifier = generateCodeVerifier();

        const code_challenge = generateCodeChallenge(code_verifier);
        // Genera un identificador único para state
        const state = crypto.randomBytes(16).toString('hex');
        // req.session.code_verifier = code_verifier;
        // Guarda el state también si lo necesitas para verificarlo luego
        // req.session.oauthState = state;

        await organizadorBD.guardarOAuthData(idOrganizador, { state, code_verifier });

        // Puedes guardar este state en la sesión o en la base de datos para verificarlo luego
        // req.session.oauthState = state; // ejemplo con sesión
        // const hash = crypto.createHash('sha256').update(code_verifier).digest();
        // const code_challenge = hash.toString('base64')
        //     .replace(/=/g, '')
        //     .replace(/\+/g, '-')
        //     .replace(/\//g, '_');


        const client_id = process.env.CLIENT_ID;  // Reemplaza con tu client_id
        const redirect_uri = process.env.REDIRECT_URI; // Debe coincidir con lo registrado en Mercado Pago

        console.log('state al iniciar es: ', state)
        console.log('code verifier al iniciar es: ', code_verifier)
        console.log('client_id al iniciar es: ', client_id)
        console.log('redirect_uri al iniciar es: ', redirect_uri)

        // Construcción de la URL de autorización

        const authorizationUrl = `https://auth.mercadopago.com/authorization?response_type=code&client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&code_challenge=${code_challenge}&code_challenge_method=S256&state=${state}`;

        // Redirige al usuario a la URL de Mercado Pago
        console.log(authorizationUrl)
        // return res.redirect(authorizationUrl);
        return res.status(200).json({ authorizationUrl });
    } catch (error) {
        console.log('El error en oauth es: ', error)

    }

    // await res.redirect(authorizationUrl);
};

// controllers/oauth.controller.js (o en otro archivo, según tu estructura)
const callback = async (req, res) => {
    console.log('función callback llamada.')
    const { code, state } = await req.query;

    const oauthData = await organizadorBD.obtenerOAuthDataPorState(state);
    console.log('oauthData es: ', oauthData)
    if (!oauthData) {
        return res.status(400).json({ message: "No se encontró información de OAuth para el state recibido." });
    }
    const { oauthCodeVerifier, idOrganizador } = oauthData;

    // const storedState = await req.session.oauthState;
    // const code_verifier = await req.session.code_verifier;
    // const idOrganizador = req.session.idOrganizador; // Recupera el idOrganizador si fue enviado

    console.log('code es: ', code)
    console.log('state es: ', state)
    // console.log('storedState es: ', storedState)
    console.log('codeVerifier es: ', oauthCodeVerifier)
    console.log('idOrganizador es: ', idOrganizador)

    // if (state !== storedState) {
    //     return res.status(400).send("Error: El estado no coincide, posible ataque CSRF");
    // }

    console.log('code es: ', code);
    console.log('Autorizacion exitosa')

    // Variables de configuración (idealmente desde variables de entorno)
    const client_id = process.env.CLIENT_ID;
    const client_secret = process.env.CLIENT_SECRET;
    const redirect_uri = process.env.REDIRECT_URI;

    console.log('clientId es: ', client_id)
    console.log('clientSecret es: ', client_secret)
    console.log('redirectUri es: ', redirect_uri)

    try {
        const tokenResponse = await axios.post('https://api.mercadopago.com/oauth/token', {
            grant_type: 'authorization_code',
            client_id,
            client_secret,
            code,
            redirect_uri,
            code_verifier: oauthCodeVerifier // Enviamos el code_verifier almacenado
        });

        // Aquí puedes guardar el token recibido (access_token, refresh_token, etc.) de forma segura.
        console.log('el callback es: ', tokenResponse.data)

        await organizadorBD.actualizarToken(idOrganizador, {
            access_token: tokenResponse.data.access_token,
            refresh_token: tokenResponse.data.refresh_token,
            expires_in: tokenResponse.data.expires_in,
            user_id: tokenResponse.data.user_id,
            public_key: tokenResponse.data.public_key,
            live_mode: tokenResponse.data.live_mode
        });

        res.status(200).json(tokenResponse.data);
    } catch (error) {
        console.error('Error al obtener el token:', error.response?.data || error.message);
        res.status(500).json({
            message: 'Error al obtener el token',
            error: error.response?.data || error.message
        });
    }
};

const exchangeCodeForToken = async (req, res) => {
    const client_id = 'TU_APP_ID';
    const client_secret = 'TU_CLIENT_SECRET';
    const redirect_uri = 'https://www.tu-dominio.com/callback'; // Debe coincidir

    try {
        const response = await axios.post('https://api.mercadopago.com/oauth/token', {
            grant_type: 'authorization_code',
            client_id,
            client_secret,
            code,
            redirect_uri,
            code_verifier  // Inclúyelo si usaste PKCE
        });
        return response.data; // Contiene access_token, refresh_token, etc.
    } catch (error) {
        console.error('Error al obtener el token:', error.response.data);
        throw error;
    }
}

module.exports = {
    iniciarOAuth,
    callback
}