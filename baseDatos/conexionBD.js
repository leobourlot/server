const mysql = require('mysql2/promise');




// conexión a la base de datos
const conexion = mysql.createPool({
    host: 'localhost',
    user: 'leobourlot',
    database: 'ajpp',
    password: 'EDdV3C*0Aa3;'
});

module.exports = conexion
