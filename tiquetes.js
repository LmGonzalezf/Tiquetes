const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'TaquiApp',
  password: 'lucho8540',
  port: 5432,
})


//--------------------------------------------- GET ---------------------------

//Obtener todos los tiquetes de la tabla tiquetes
const getTiquetes = (request, response) => {
  pool.query('SELECT * FROM tiquetes ORDER BY fecha ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
//Obtener tiquetes en forma de cliente dada una linea de la tabla tiquetes
//Util para obtener y anular tiquetes de una linea
const getTiquetesLinea = (request, response) => {

  const id_linea = parseInt(request.params.id)

  pool.query('SELECT * FROM tiquetes WHERE id_linea = $1', [id_linea], (error, results) => {
    if (error) {
      response.status(400).send('Error obteniendo los tiquetes: ' + error)
    }

    response.status(200).json(results.rows)
  })
}
//Obtener un tiquete por id de la tabla tiquetes
//Este se usa para visualizar, anular y re imprimir tiquetes especificos (en forma de cliente) 
const getTiqueteById = (request, response) => {

  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM tiquetes WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
//Obtener todos los tiquetes de la tabla linea_tiquetes
const getTiquetesPuestos = (request, response) => {
  pool.query('SELECT * FROM linea_tiquetes ORDER BY fecha ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
//Obtener tiquetes por linea puesto por puesto (de la tabla linea_tiquetes)
//Util para ver los puestos actuales que están ocupados en la linea
const getTiquetesPuestosByLinea = (request, response) => {


  const id_linea = parseInt(request.params.id)

  pool.query('SELECT * FROM linea_tiquetes WHERE id_linea = $1', [id_linea], (error, results) => {
    if (error) {
      response.status(400).send('Error obteniendo los tiquetes: ' + error)
    }

    response.status(200).json(results.rows)
  })
}
//Obtener tiquetes de la tabla linea_tiquetes dada un id de tiquete
const getTiquetesPuestosByTiquete = (request, response) => {


  const id_tiquete = parseInt(request.params.id)

  pool.query('SELECT * FROM linea_tiquetes WHERE id_tiquete = $1', [id_tiquete], (error, results) => {
    if (error) {
      response.status(400).send('Error obteniendo los tiquetes: ' + error)
    }

    response.status(200).json(results.rows)
  })
}


//----------------------------- POST -------------------------------------------------------

//Creación de un tiquete y a la vez un cliente si este no está registrado
const createTiquete = (request, response) => {
  (async () => {
    // note: we don't try/catch this because if connecting throws an exception
    // we don't need to dispose of the client (it will be undefined)
    const client = await pool.connect()
    idfinal = "";
    try {
      await client.query('BEGIN')
      console.log("Comienza la transacción")
      const values = {
        cedula,
        id_linea,
        fecha,
        hora,
        precio,
        origen,
        destino,
        cantidad_puestos,
        fecha_exp,
        hora_exp,
      } = request.body
      const valuess = []
      //For para meter todos los valores en un arreglo
      for (var key in values) {
        if (values.hasOwnProperty(key)) {
          if (key == "puestos")
            break;
          valuess.push(values[key])
        }
      }
      const puestos = request.body.puestos
      //Esta parte va a comprobar si existe un pasajero actualmente en la base de datos, si no, lo crea antes de crear el tiquete
      const nombre = request.body.nombre
      queryclienteget = 'SELECT * FROM clientes WHERE cedula = $1'
      const cliente = await client.query(queryclienteget, [cedula])

      if (cliente.rows.length == 0) {
        console.log("No hay un cliente con ese ID")
        querycrearcliente = 'INSERT INTO clientes (cedula, nombre) VALUES ($1, $2)'
        await client.query(querycrearcliente, [cedula, nombre])
      }
      //Termina la creación del cliente
      //Inserta el tiquete en la tabla tiquetes
      const queryText = 'INSERT INTO "tiquetes" (cedula, id_linea, fecha, hora, precio, origen, destino, cantidad_puestos, fecha_exp, hora_exp) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id'
      const {
        rows
      } = await client.query(queryText, valuess)
      //Obtención del id del tiquete recien creado para insertar los puestos en la tabla linea_tiquetes
      id_ticket = rows[0].id
      idfinal = rows[0].id
      const insertPuestos = 'INSERT INTO linea_tiquetes (id_linea, id_tiquete, num_puesto) VALUES ($1 , $2 , $3)'
      //For hecho para insertar todos los puestos del tiquete
      for (let index = 0; index < puestos.length; index++) {

        await client.query(insertPuestos, [id_linea, id_ticket, puestos[index]])
      }
      await client.query('COMMIT')
      response.status(201).send(`Tiquete vendido satisfactoriamente con ID: ${idfinal}`)
    } catch (e) {
      await client.query('ROLLBACK')
      response.status(401).send('No se pudo completar la transacción: ' + e)
    } finally {
      client.release()
    }
  })().catch(e => console.error(e.stack))
}

//------------------------------------------- PUT --------------------------------------------
//Actualización de una tiquete
const updateTiquete = (request, response) => {
  (async () => {
    // note: we don't try/catch this because if connecting throws an exception
    // we don't need to dispose of the client (it will be undefined)
    const client = await pool.connect()
    idfinal = "";
    try {
      await client.query('BEGIN')
      console.log("Comienza la transacción")
      const tiquete = parseInt(request.params.id)
      const bod = {
        cedula,
        id_linea,
        fecha,
        hora,
        precio
      } = request.body
      console.log(bod)
      values = []
      for (var key in bod) {
        if (bod.hasOwnProperty(key)) {
          values.push(bod[key])
        }
      }
      values.push(tiquete)
      console.log(values)

      //Actualiza el tiquete en la tabla tiquetes
      const queryText = 'UPDATE tiquetes SET cedula = $1, id_linea = $2, fecha = $3, hora = $4, precio = $5 WHERE id = $6 RETURNING *'
      const {
        rows
      } = await client.query(queryText, values)
      //Empieza la actualización en la tabla  
      const actualizarPuestos = 'UPDATE linea_tiquetes SET id_linea = $1 WHERE id_tiquete = $2 RETURNING *'
      const res = await client.query(actualizarPuestos, [id_linea, tiquete])
      await client.query('COMMIT')
      response.status(201).send(res.rows)
    } catch (e) {
      await client.query('ROLLBACK')
      response.status(401).send('No se pudo completar la transacción: ' + e)
    } finally {
      client.release()
    }
  })().catch(e => console.error(e.stack))
}

//-------------------------------------- DELETE ------------------------------------------

//Eliminación de un tiquete
const deleteTiquete = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM tiquetes WHERE id = $1', [id], (error, results) => {
    if (error) {
      response.status(401).send('No se pudo anular el tiquete' + e)
    }
    response.status(200).send(`Tiquete anulado correctamente ID: ${id}`)
  })
}
module.exports = {
  getTiquetes,
  getTiqueteById,
  getTiquetesLinea,
  getTiquetesPuestosByLinea,
  getTiquetesPuestosByTiquete,
  getTiquetesPuestos,
  deleteTiquete,
  createTiquete,
  updateTiquete
}