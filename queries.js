var db = require('./db.js');
var pool = db.getPool();

const getUsers = (request, response) => {
  console.log("Entró")
  pool.query('SELECT * FROM usuarios ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    if(results != undefined)
      response.status(200).json(results.rows)
    else
      response.status(200).send(results)
  })
}

const getUserById = (request, response) => {

  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM usuarios WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    if(results != undefined)
      response.status(200).json(results.rows)
      else
      response.status(200).send(results)
  })
}
const createUser = (request, response) => {
  const {
    name,
    email
  } = request.body

  pool.query('INSERT INTO usuarios (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${result.insertId}`)
  })
}
const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const {
    name,
    email
  } = request.body

  pool.query(
    'UPDATE usuarios SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}
const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM usuarios WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}
/*
const getDestinos = (request, response) => {
  console.log("entró a destinos")
  pool.query('select array_to_json(array_agg(row_to_json(t))) from ( select * from destinos) t'), (error, results) => {
    if (error)
    {
      console.log("caremonda error: " + error)
      response.status(400).send('Error obteniendo destinos: ' + error)
    }
    console.log("caremonda: ")
    response.status(200).send(results)
  }
}
*/
const getDestinos = (request, response) => {
  console.log("Entró a destinos")
  pool.query('select array_to_json(array_agg(row_to_json(t))) from ( select * from destinos) t', (error, results) => {
    if (error) {
      console.log("caremonda error: " + error)
      response.status(400).send('Error obteniendo destinos: ' + error)
    }
    console.log("caremonda: " + results.rows)
    if(results != undefined)
      response.status(200).send(results.rows[0].array_to_json)
    else 
      response.status(200).send(response)
  })
}

const login = (request, response) => {
  console.log("Entró: " + request.body.id + request.body.pass)
  pool.query('SELECT * FROM usuarios WHERE id = $1 AND contrasena = $2', [request.body.id, request.body.pass], (error, results) => {  
    if(results.rows.length == 0){
      response.status(401).send('Usuario o Contraseña Incorrecta')
    }
    else{
      response.status(200).send('Login Correcto')
    }
  })
  
}

const getCarroById = (request, response) => {
  const carro = request.params.carro
  console.log("Entró a carrosbyid")
  pool.query('select array_to_json(array_agg(row_to_json(t))) from ( select * from carros where numero = $1) t', [carro], (error, results) => {
    if (error) {
      console.log(error)
      response.status(400).send('Error obteniendo destinos: ' + error)
    }
    if(results != undefined)
      response.status(200).send(results.rows[0].array_to_json)
    else
      response.status(200).send(results)
  })
}
module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getDestinos,
  login,
  getCarroById
}