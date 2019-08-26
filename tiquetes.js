const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'TaquiApp',
  password: 'lucho8540',
  port: 5432,
})


//--------------------------------------------- GET ---------------------------

//Obtener todos los tiquetes
const getTiquetes = (request, response) => {
  console.log("Entró")
  pool.query('SELECT * FROM tiquetes ORDER BY fecha ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
//Obtener un tiquete por id
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

//Obtener tiquetes por linea para impresión
//Este se usa para visualizar todos los tiquetes (en forma de cliente) que están en una linea
const getTiquetesLinea = (request, response) => {


  const id_linea = parseInt(request.params.id)

  pool.query('SELECT * FROM linea_tiquetes WHERE id_linea = $1', [id_linea], (error, results) => {
    if (error) {
      response.status(400).send('Error obteniendo los tiquetes: ' + error)
    }
    if(results.rows.length == 0)
    {
      console.log("así se compara")
    }
    response.status(200).json(results.rows)
  })
}

//Obtener tiquetes (individualmente por puesto) por linea para ver
//Este es el que se usa para poder visualizar los puestos ocupados y disponibles, útil para el fron
const createTiquete = (request, response) => {
(async () => {
  // note: we don't try/catch this because if connecting throws an exception
  // we don't need to dispose of the client (it will be undefined)
  const client = await pool.connect()
  idfinal ="";
  try {
    await client.query('BEGIN')
    console.log("Comienza la transacción")
    const values = {cedula,
      id_linea,
      fecha,
      hora,
      precio,
      origen,
      destino,
      cantidad_puestos,
      fecha_exp,
      hora_exp,} = request.body
      //values["cedula"], values["id_linea"], values["fecha"], values["hora"], values["id_linea"], values["id_linea"]
    const valuess = []
    for (var key in values) {
      if (values.hasOwnProperty(key)) {
        if(key == "puestos")
        break;
          valuess.push(values[key])
          //console.log(key + " -> " + values[key]);
      }
  }
    console.log(valuess)
    const puestos = request.body.puestos
    //Esta parte va a comprobar si existe un pasajero actualmente en la base de datos, si no, lo crea antes de crear el tiquete
    const nombre = request.body.nombre
    queryclienteget = 'SELECT * FROM clientes WHERE cedula = $1'
    const cliente  = await client.query(queryclienteget, [cedula])
    
    if(cliente.rows.length == 0)
    {
      console.log("No hay un cliente con ese ID")
      querycrearcliente = 'INSERT INTO clientes (cedula, nombre) VALUES ($1, $2)'
      await client.query(querycrearcliente, [cedula, nombre])
    }
    const queryText = 'INSERT INTO "tiquetes" (cedula, id_linea, fecha, hora, precio, origen, destino, cantidad_puestos, fecha_exp, hora_exp) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id'
    const { rows } = await client.query(queryText, valuess)
    id_ticket = rows[0].id
    idfinal = rows[0].id
    const insertPuestos = 'INSERT INTO linea_tiquetes (id_linea, id_tiquete, num_puesto) VALUES ($1 , $2 , $3)'
    for (let index = 0; index < puestos.length; index++) {
      
      await client.query(insertPuestos, [id_linea, id_ticket, puestos[index]])
    }
    await client.query('COMMIT')
    response.status(201).send(`Tiquete vendido satisfactoriamente con ID: ${idfinal}`)
  } catch (e) {
    await client.query('ROLLBACK')
    response.status(401).send('No se pudo completar la transacción' + e)
  } finally {  
    client.release()
  } 
})().catch(e => console.error(e.stack))
}
//Creación de un tiquete asignado a una linea
/*
const createTiquete = (request, response) => {
  const {
    cedula,
    id_linea,
    fecha,
    hora,
    precio,
    origen,
    destino,
    num_silla,
    fecha_exp,
    hora_exp,

  } = request.body

  var puestos = request.body.puestos

  pool.query('INSERT INTO usuarios (cedula, id_linea, fecha, hora, precio, origen, destino, cantidad_puestos, fecha_exp, hora_exp) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [cedula, id_linea, fecha, hora, precio, origen, destino, cantidad_puestos, fecha_exp, hora_exp], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Tiquete vendido satisfactoriamente con ID: ${result.insertId}`)
  })

  puestos.forEach(function(value){
    console.log(value);
  });
}
*/
//-------------------------------------- DELETE ------------------------------------------

//Anulación de un tiquete
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
  deleteTiquete,
  createTiquete   
}