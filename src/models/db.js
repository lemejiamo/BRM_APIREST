const mysql = require('mysql');

const dbconection = mysql.createConnection({
    host: 'localhost',
    database: 'BRM_STORE',
    user: 'BRM_DEV',
    password: 'BRMDEV',
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


