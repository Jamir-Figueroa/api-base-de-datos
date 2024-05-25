const mysql = require ('mysql') //Usar la libreria de sql

//configuracion de la base de datos 
const configuracion =  mysql.createConnection ({
host: '127.0.0.1',
user:'root',
password:'Jamir345M',
database:'proyectos'
});

module.exports = configuracion; //Exportar la configuracion
