const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Taquilla',
  password: 'lucho8540',
  port: 5432,
})

const getUsers = (request, response) => {
  console.log("Entró")
  pool.query('SELECT * FROM usuarios ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {

  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM usuarios WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
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
module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}