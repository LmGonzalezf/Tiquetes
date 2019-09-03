const db = require('./queries.js')
const tickets = require('./tiquetes.js')
const lineas = require('./lineas.js')
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.options('*', cors())
app.use(cors())

app.get('/', function (req, res) {
  res.send('Hello World!');
});

//LOGIN
app.post('/login', db.login)
//CRUD de Usuarios
app.get('/usuarios', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

//CRUD de DESTINOS
app.get('/destinos', db.getDestinos)

//----------------------------------------------CRUD de Tiquetes --------------------------------------------------
//Obtener todos los tiquetes de la tabla tiquetes
app.get('/tiquetes', tickets.getTiquetes)

//Obtener los tiquetes de la tabla tiquetes dado un id de tiquete
app.get('/tiquetes/:id', tickets.getTiqueteById)

//Obtener los tiquetes de la tabla tiquetes dado un id de linea
app.get('/tiqueteslinea/:id', tickets.getTiquetesLinea)

//Obtener todos los tiquetes de la tabla linea_tiquetes
app.get('/tiquetesConPuesto', tickets.getTiquetesPuestos)

//Obtener los tiquetes de la tabla linea_tiquetes dado un id de tiquete
app.get('/tiquetesConPuesto/:id', tickets.getTiquetesPuestosByTiquete)

//Obtener los tiquetes de la tabla linea_tiquetes dado un id de linea
app.get('/tiquetesLineaConPuesto/:id', tickets.getTiquetesPuestosByLinea)

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

//Elminación de una linea 
app.delete('/lineas/:id', lineas.deleteLinea)

// rodamientos, cuentas aparte gm y rionegro, transbordo


//-------------------------------------------------- CRUD de Remesas ---------------------------------------------------
/*
//Obtener todas las remesas 
app.get('/remesas', remesas.getRemesas)

//Obtener las remesas dado un id de remesa
app.get('/remesas/:id', remesas.getRemesasById)

//Obtener las remesas dado un id de linea
app.get('/remesaslinea/:id', remesas.getRemesasLinea)

//Creación de una remesa
app.post('/remesas', remesas.createRemesa)

//Actualización de una remesa
app.put('/remesas/:id', remesas.updateRemesa)

//Anulación de una remesa
app.delete('/remesas/:id', remesas.deleteRemesa)
*/
//-------------------------------------------------CRUD de Cierres ----------------------------------------------------

//-----------------------------------------------------------------------------------------------
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});