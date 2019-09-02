var db = require('./db.js');
var pool = db.getPool();
//--------------------------------------------- GET ---------------------------

//Obtener todas las remesas
const getRemesas = (request, response) => {
    console.log("Comienza transacción para obtener todas las remesas")
    pool.query('SELECT * FROM remesas ORDER BY fecha ASC', (error, results) => {
        if (error) {
            response.status(400).send('Error obteniendo las remesas: ' + error)
        }
        response.status(200).json(results.rows)
    })
}
//Obtener todas las remesas dada una fecha 
// El formato es YYYY-MM-DD
const getRemesasByFecha = (request, response) => {
    console.log("Comienza transacción para obtener todas las remesas por fecha")
    const fecha = request.params.fecha
    pool.query('SELECT * FROM remesas WHERE fecha = $1 ORDER BY fecha ASC', [fecha], (error, results) => {
        if (error) {
            response.status(400).send('Error obteniendo las remesas: ' + error)
        }
        response.status(200).json(results.rows)
    })
}
//Obtener todas las remesas dado un carro
const getRemesasByCarro = (request, response) => {
    console.log("Comienza transacción para obtener todas las remesas por carro")
    const carro = request.params.carro
    pool.query('SELECT * FROM remesas WHERE num_carro = $1 ORDER BY fecha ASC', [carro], (error, results) => {
        if (error) {
            response.status(400).send('Error obteniendo los tiquetes: ' + error)
        }
        response.status(200).json(results.rows)
    })
}
//Obtener todas las lineas dada una fecha y un carro
const getLineasByFechaCarro = (request, response) => {
    console.log("Comienza transacción para obtener todas las lineas por fecha y carro")
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
    console.log("Comienza transacción para crear una linea")
    const bod = {
        num_carro,
        hora,
        fecha,
        destino,
        origen,
        estado,
        total,
        tiquetes,
    } = request.body
    values = []
    for (var key in bod) {
        if (bod.hasOwnProperty(key)) {
            values.push(bod[key])
        }
    }
    pool.query('INSERT INTO lineas (num_carro, hora, fecha, destino, origen, estado, total, tiquetes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', values, (error, results) => {
        if (error) {
            response.status(400).send('Error creando linea: ' + error)
        } //`Linea creada con ID: ${results.rows[0].id}`
        response.status(201).send(results.rows[0])
    })
}

//-------------------------------------- PUT -------------------------------------------
//Actualización de una linea, actualiza todas los valores de una linea
const updateLinea = (request, response) => {
    console.log("Comienza transacción para actualizar una linea")
    const linea = request.params.id
    const bod = {
        num_carro,
        estado,
    } = request.body
    values = []
    for (var key in bod) {
        if (bod.hasOwnProperty(key)) {
            values.push(bod[key])
        }
    }
    values.push(parseInt(linea))
    console.log(values)
    pool.query('UPDATE lineas SET num_carro = $1, estado = $2 WHERE id = $3 RETURNING *', values, (error, results) => {
        if (error) {
            response.status(400).send('Error actualizando linea: ' + error)
        }
        response.status(200).json(results.rows)
    })
}

//-------------------------------------- DELETE --------------------------------------
//Eliminación de una linea 
const deleteLinea = (request, response) => {
    console.log("Comienza transacción para eliminar una linea")
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