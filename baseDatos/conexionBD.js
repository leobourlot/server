const mysql = require('mysql2/promise');




// conexión a la base de datos
const conexion = mysql.createPool({
    host: 'srv1198.hstgr.io',
    user: 'u144219150_leobourlot',
    database: 'u144219150_ajpp',
    password: 'EDdV3C*0Aa3;'
});

module.exports = conexion
