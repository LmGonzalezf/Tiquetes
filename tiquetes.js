const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Taquilla',
  password: 'lucho8540',
  port: 5432,
})

//--------------------------------------------- GET ---------------------------
//Obtener todos los tiquetes
const getTiqutes = (request, response) => {
    console.log("Entró")
    pool.query('SELECT * FROM tiquetes ORDER BY fecha ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
//Obtener un tiquete por id
const getTiqueteById = (request, response) => {
      
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM tiquetes WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  //Obtener tiquetes por linea
const getTiquetesLinea = (request, response) => {
      
    const id_linea = parseInt(request.params.id_linea)
  
    pool.query('SELECT * FROM tiquetes WHERE id_linea = $1', [id_linea], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
//Obtener tiquetes por fecha
const getTiquetesFecha = (request, response) => {
      
    const fecha = parseInt(request.params.fecha)
  
    pool.query('SELECT * FROM tiquetes WHERE fecha = $1', [fecha], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  //----------------------------------- POST ----------------------------------------

  //Creación de un tiquete asignado a una linea
  const createTiquete = (request, response) => {
    const { cedula, id_linea, fecha, hora, precio, origen,  destino } = request.body
  
    pool.query('INSERT INTO usuarios (cedula,id_linea, fecha, hora, precio, origen, destino) VALUES ($1, $2, $3, $4)', [cedula, id_linea, fecha, hora], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${result.insertId}`)
    })
  }
  
  //-------------------------------------- DELETE ------------------------------------------

  //Anulación de un tiquete
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
  