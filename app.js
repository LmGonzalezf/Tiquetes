const db = require('./queries.js')
const tickets = require('./tiquetes.js')
const lineas = require('./lineas.js')
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', function (req, res) {
  res.send('Hello World!');
});


//CRUD de Usuarios
app.get('/usuarios', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

//----------------------------------------------CRUD de Tiquetes --------------------------------------------------
//Obtener todos los tiquetes de la tabla tiquetes
app.get('/tiquetes', tickets.getTiquetes)
//Obtener los tiquetes de la tabla tiquetes dado un id de linea
app.get('/tiqueteslinea/:id', tickets.getTiquetesLinea)
//Obtener los tiquetes de la tabla tiquetes dado un id de tiquete
app.get('/tiquetes/:id', tickets.getTiqueteById)
//Obtener todos los tiquetes de la tabla linea_tiquetes
app.get('/tiquetesLineaSinPuesto/:id', tickets.getTiquetesPuestos)
//Obtener los tiquetes de la tabla linea_tiquetes dado un id de linea
app.get('/tiquetesLineaSinPuesto/:id', tickets.getTiquetesPuestosByLinea)
//Obtener los tiquetes de la tabla linea_tiquetes dado un id de tiquete
app.get('/tiquetesLineaSinPuesto/:id', tickets.getTiquetesPuestosByTiquete)
//Creación de un tiquete
app.post('/tiquetes', tickets.createTiquete)
//Actualización de un tiquete
app.put('/tiquetes/:id', tickets.updateTiquete)
//Anulación de un tiquete
app.delete('/tiquetes/:id', tickets.deleteTiquete)


//--------------------------------------------------- CRUD de Lineas ----------------------------------------------
//Obtener todas las lineas 
app.get('/lineas', lineas.getLineas)
//Obtener todas las lineas dada una fecha con formato YYYY-MM-DD
app.get('/lineas/:fecha', lineas.getLineasByFecha) 
//Obtener todas las lineas dado el numero de un carro
app.get('/lineasCarro/:carro', lineas.getLineasByCarro) 
//Obtener todas las lineas dado un carro y una fecha
app.get('/lineasFechaCarro/:fecha&:carro', lineas.getLineasByFechaCarro)
//Creación de una linea
app.post('/lineas', lineas.createLinea)
//Actualización de una linea (carro, hora, estado, etc)
app.put('/lineas/:id', lineas.updateLinea)



//-----------------------------------------------------------------------------------------------
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});