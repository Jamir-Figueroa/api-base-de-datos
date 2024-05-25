//crear un servidor con express
const express = require ('express');

//Incluir el corse
const cors = require('cors');

//Incluir el body-parser (para procesar peticiones POST)
const bodyparser = require ('body-parser')

//incluir la configuracion de conexion a mysql
const configuracion = require ('./config');
const bodyParser = require('body-parser');

//crear un servidor con express
const app = express();

//Usar el cors
app.use(cors());

//Usar el body-parser
app.use (bodyParser.json());

//Usar e,l puerto 3000
const port = 3000;

//Crear una ruta por defecto
app.get('/',(req,res)=> {
    res.send('Hello Word');
});
//crear una ruta para obtener todos los proyectos
app.get('/proyectos', (req, res) =>{
//Realizar la consulta a la base de datos
configuracion.query('SELECT * FROM proyecto', (err, filas) =>{
    if (err){
        console.log(err);
        res.status(500).send('Error al obtener los proyecto');
    } else  {
        res.json(filas);
    }
    });
});

//Store a project in the database
app.post('/proyecto', (req, res) => {
    // Get the data from the request
    const data = req.body;
    console.log(data);

    // Perform the query
    configuracion.query('INSERT INTO proyecto SET ?', data, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error al guardar el proyecto');
        } else {
            // Return the response
            res.json({
                id: result.insertId,
                ...data
            });
        }
    });
});

//Iniciar el servidor }
app.listen(port, () => {
console.log(`server runnig on port ${port}`);
});

//crear una ruta para obtener todos los proyectos
app.get('/miembros', (req, res) =>{

//Realizar la consulta a la base de datos
configuracion.query('SELECT * FROM miembros', (err, filas) =>{
    if (err){
        console.log(err);
        res.status(500).send('Error al obtener los miembros');
    } else  {
        res.json(filas);
    }
    });
});

//Cargar las actividades de un proyecto pasando el id de la URL
//luego en la query
//Cargar en esta misma ruta los miembros 
app.get('/proyecto/:id/actividades', (req, res) =>{

    //Realizar la consulta a la base de datos
    configuracion.query('SELECT * FROM actividades WHERE proyecto_id = ?', req.params.id, (err, filas) =>{
        if (err){
            console.log(err);
            res.status(500).send('Error al obtener las actividades');
        } else  {
            res.json(filas);
        }
        });
    });