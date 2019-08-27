const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'TaquiApp',
    password: 'lucho8540',
    port: 5432,
})

//--------------------------------------------- GET ---------------------------

//Obtener todas las lineas
const getLineas = (request, response) => {
    pool.query('SELECT * FROM lineas ORDER BY fecha ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
//Obtener todas las lineas dada una fecha 
// El formato es YYYY-MM-DD
const getLineasByFecha = (request, response) => {
    const fecha = request.params.fecha

    pool.query('SELECT * FROM lineas WHERE fecha = $1 ORDER BY fecha ASC', [fecha], (error, results) => {
        if (error) {
            response.status(400).send('Error obteniendo los tiquetes: ' + error)
        }
        response.status(200).json(results.rows)
    })
}
//Obtener todas las lineas dado un carro
const getLineasByCarro = (request, response) => {
    const carro = request.params.carro
    pool.query('SELECT * FROM lineas WHERE num_carro = $1 ORDER BY fecha ASC', [carro], (error, results) => {
        if (error) {
            response.status(400).send('Error obteniendo los tiquetes: ' + error)
        }
        response.status(200).json(results.rows)
    })
}
//Obtener todas las lineas dada una fecha y un carro
const getLineasByFechaCarro = (request, response) => {
    const carro = request.params.carro
    const fecha = request.params.fecha
    pool.query('SELECT * FROM lineas WHERE num_carro = $1 AND fecha = $2 ORDER BY fecha ASC', [carro, fecha], (error, results) => {
        if (error) {
            response.status(400).send('Error obteniendo los tiquetes: ' + error)
        }
        response.status(200).json(results.rows)
    })
}

//------------------------ POST ----------------------------------------------------
//Creación de una linea
const createLinea = (request, response) => {
    const bod = {
        num_carro,
        hora,
        fecha,
        destino,
        origen,
        estado
    } = request.body
    values = []
    for (var key in bod) {
        if (bod.hasOwnProperty(key)) {
            values.push(bod[key])
        }
    }
    pool.query('INSERT INTO lineas (num_carro, hora, fecha, destino, origen, estado) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id', values, (error, results) => {
        if (error) {
            response.status(400).send('Error creando linea: '+ error)
        }
        response.status(201).send(`Linea creada con ID: ${results.rows[0].id}`)
    })
}

//-------------------------------------- PUT -------------------------------------------
//Actualización de una linea, actualiza todas los valores de una linea
const updateLinea = (request, response) => {
    const linea = request.params.id
    const bod = {
        num_carro,
        hora,
        fecha,
        destino,
        origen,
        estado
    } = request.body
    values = []
    for (var key in bod) {
        if (bod.hasOwnProperty(key)) {
            values.push(bod[key])
        }
    }
    
    values.push(parseInt(linea))
    console.log(values)
    pool.query('UPDATE lineas SET num_carro = $1, hora = $2, fecha = $3, destino = $4, origen = $5, estado = $6 WHERE id = $7 RETURNING *', values, (error, results) => {
        if (error) {
            response.status(400).send('Error actualizando linea: ' + error)
        }
        response.status(200).json(results.rows)
    })
}

//-------------------------------------- DELETE --------------------------------------
//Eliminación de una linea 
const deleteLinea = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM lineas WHERE id = $1', [id], (error, results) => {
      if (error) {
        response.status(401).send('No se pudo anular la linea' + e)
      }
      response.status(200).send(`Linea anulada correctamente ID: ${id}`)
    })
  }

module.exports = {
    getLineasByFecha,
    getLineas,
    getLineasByCarro,
    getLineasByFechaCarro,
    createLinea,
    updateLinea,
    deleteLinea
}