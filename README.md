# BRM_APIREST

Api rest en NodeJS

Dependencias necesarias:
    crypto
    express
    express-handlebars
    method-override
    mysql

Manejar un control de inventario y  crear un registro de clientes, por medio de una conexiòn una base de datos relacional MySQL.

## Despliegue

Ejecute el Script 'init_db.sql', para crear la base de datos necesaria con sus respectivas tablas, Inventarios, Usuarios y Ventas.

Ejecute el script 'db_data.sql' para crear datos de prueba en la base de datos.

Ubiquese en el directorio raiz y corra la aplicaciòn en el servidor de NODEJS:

Ejecute "node src/app.js"

El servidor se ejecuta en localhost y el puerto predeterminado para la conexion en el 3000

Acceda desde su navegador preferido en la direccion "localhost:3000"


# Rutas API
DATE 2022 06 07

## Usuarios

/register,  permite registrar un cliente en la base de datos

/login,  permite iniciar sesion en la aplicacion (parcialmente implementado, realiza la validacion de usuario y contraseña)

## Productos

/productCreate, permite ingresar productos al inventario retorna una respuesta JSON

/productUpdate, permite actualizar los datos de un producto en el inventario, retorna una respuesta JSON

/productoDelete, permite borrar un producto del inventario

/productSearch, permite visualizar la informacion de un producto, retorna una respuesta JSON

/productSearchAll, retorna todos los productos del inventario en una respuesta JSON




