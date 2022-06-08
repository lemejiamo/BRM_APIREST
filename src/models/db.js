const mysql = require('mysql');

const dbconection = mysql.createConnection({
    host: 'localhost',
    database: 'BRM_STORE',
    user: 'root',
    password: '123456789',
    insecureAuth : true
});

dbconection.connect(function (error) {
    if (error) {
        console.log(error)
        console.log('ERROR CONECTANDO CON LA BASE DE DATOS');
        return
    }else{
        console.log('CONEXION EXITOSA A LA BASE DE DATOS');
    }
});

module.exports = dbconection;


