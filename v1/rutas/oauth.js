const { Router } = require('express');

const { iniciarOAuth, callback } = require('../../controladores/oauth');

const router = Router();

router
    .get('/iniciar/:idOrganizador', iniciarOAuth)
    .get('/callback', callback);

module.exports = router;
