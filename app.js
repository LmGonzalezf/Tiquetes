const db = require('./queries.js')
const tickets = require('./tiquetes.js')
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

//CRUD de Tiquetes
//app.get('/tiquetes', tickets.getUsers)
//app.get('/tiquetes/:id', tickets.getUserById)
app.post('/tiquetes', tickets.createTiquete)
//app.put('/users/:id', tickets.updateUser)
//app.delete('/users/:id', tickets.deleteUser)

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

