const mysql = require('mysql2/promise');




// conexión a la base de datos
const conexion = mysql.createPool({
    host: 'srv1198.hstgr.io',
    user: 'u144219150_leobourlot',
    database: 'u144219150_ajpp',
    password: 'EDdV3C*0Aa3;',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive : true,  // <— esto ayuda a que no muera la conexión por inactividad
    keepAliveInitialDelay: 0
});

module.exports = conexion
