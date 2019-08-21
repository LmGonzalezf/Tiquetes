const db = require('./queries.js')
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
app.get('/usuarios', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

