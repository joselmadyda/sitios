const express = require('express')
const _ = require('lodash')
//const Joi = require('@hapi/joi')
// const sitiosDAO = require('./sitiosDAO')
const sitiosDAO = require('./sitiosDAO_SQL')

const router = express.Router()

const baseURI = '/api/sitios'

router.get('/', async (req, res) => {
    console.log(`GETTING: ${baseURI}${req.url}`)

    if (_.isEmpty(req.query)) {
        _handleGetAll(req, res)
    } else {
        //_handleGetWithQS(req, res)
    }
})

async function _handleGetAll(req, res) {
    try {
        const result = await sitiosDAO.getAll()
        res.json(result)
    } catch (err) {
        res.status(err.status).json(err)
    }
}

router.get('/:cat', async (req, res) => {
    console.log(`GETTING: ${baseURI}${req.url}`)

    try {
        if (isNaN(req.params.cat))
            throw { status: 400, descripcion: 'Categoría inválida' }

        const resultado = await sitiosDAO.getByCategoria(req.params.cat)

        if (!resultado)
            throw { status: 404, descripcion: 'estudiante no encontrado' }

        res.status(200).json(resultado)
    } catch (err) {
        res.status(err.status).json(err)
    }
})

router.get('/sel/:idsitio/', async (req, res) => {
    console.log(`GETTING SITIO: ${baseURI}${req.url}`)
    try {
        const resultado = await sitiosDAO.getSitio(req.params.idsitio)
        res.status(200).json(resultado)
    } catch (err) {
        res.status(err.status).json(err)
    }
})

//AGREGAR NUEVO SITIO
router.post('/', async (req, res) => {
    console.log(`POSTING: ${baseURI}${req.url}`)

    try {
        const sitioNuevo = req.body
        console.log(sitioNuevo)

        const sitioCreado = await sitiosDAO.addSitio(sitioNuevo)
        const mensajeResponse = { status: 'SITIO CREADO CORRECTAMENTE', sitioCreado }
        res.status(201).json(mensajeResponse)

    } catch (err) {
        res.status(err.status).json(err)
    }
})


//UPDATE NUEVO SITIO
router.post('/upd/', async (req, res) => {
    console.log(`POSTING: ${baseURI}${req.url}`)

    try {

        console.log(req.body)

        // const sitioNuevo = req.body
        // console.log(sitioNuevo)
        // const sitioCreado = await sitiosDAO.updateSitio(sitioNuevo)
        // const mensajeResponse = { status: 'SITIO CREADO CORRECTAMENTE', sitioCreado }
        // res.status(201).json(mensajeResponse)
        
    } catch (err) {
        res.status(err.status).json(err)
    }
})

// BORRAR SITIO
router.post('/del/:idsitio/', async (req, res) => {
    console.log(`POSTING DELETE: ${baseURI}${req.url}`)
    try {
        const resultado = await sitiosDAO.deleteByIdSitio(req.params.idsitio)
        res.status(200).json(resultado)
    } catch (err) {
        res.status(err.status).json(err)
    }
})

//CONSULTA TRIANGULADA: Obtener puntos de referencia de acuerdo a una categoria/barrio/latitud/longitud
router.get('/:distancia/:id_cat/:lat/:lng', async (req, res) => {

    try {
        const resultado = await sitiosDAO.getByCategoria(req.params.id_cat)
        const objBarrioResult = []
        if (resultado) {

            if (resultado.length > 0) {
                //objBarrioResult.push({ status: 'SITIOS ENCONTRADOS' })
                for (var i = 0; i < resultado.length; i++) {
                    let distancia = getKilometros(req.params.lat, req.params.lng, resultado[i].latitud, resultado[i].longitud)
                    console.log(distancia)
                    //Verificar distancia según coordenadas de entrada
                    if (distancia <= req.params.distancia) {

                        const objBarrio = {
                            nombre_sitio: resultado[i].nombre_sitio,
                            latitud: resultado[i].latitud,
                            longitud: resultado[i].longitud,
                            voucher: resultado[i].voucher,
                            responsable: resultado[i].responsable,
                            url: resultado[i].url,
                            distancia: getKilometros(req.params.lat, req.params.lng, resultado[i].latitud, resultado[i].longitud)
                        }
                        objBarrioResult.push(objBarrio)
                    }
                }
            } else {
                objBarrioResult.push({ status: 'SITIOS NO ENCONTRADOS' })
            }
        }

        //Se informa estado 201, con las distancias calculadas de acuerdo a las coordenadas de origen y resultado del filtro
        res.status(201).json(objBarrioResult)
        console.log(objBarrioResult)

    } catch (err) {
        res.status(err.status).json(err)
    }
})


function getKilometros(lat1, lon1, lat2, lon2) {
    const rad = function (x) {
        return (x * Math.PI) / 180;
    };
    var R = 6378.137; //Radio de la tierra en km
    var dLat = rad(lat2 - lat1);
    var dLong = rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(lat1)) *
        Math.cos(rad(lat2)) *
        Math.sin(dLong / 2) *
        Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    //Devuelve el número procesado con 2 decimales
    return d.toFixed(2);
}


router.delete(':idsitio', async (req, res) => {
    console.log(`DELETING: ${baseURI}${req.url}`)

    console.log(req.params.id_sitio)
    /*
        try {
            if (isNaN(req.params.id_sitio))
                throw { status: 400, descripcion: 'El Sitio provisto no es un número o es inválido' }
    
            await sitiosDAO.deleteByIdSitio(req.params.id_sitio)
            res.status(204).send()
        } catch (err) {
            res.status(err.status).json(err)
        }*/

})
/*
router.put('/:dni', async (req, res) => {
    console.log(`REPLACING: ${baseURI}${req.url}`)

    try {
        if (isNaN(req.params.dni))
            throw { status: 400, descripcion: 'el dni provisto no es un número o es inválido' }

        const nuevo = req.body

        if (esEstudianteInvalido(nuevo))
            throw { status: 400, descripcion: 'el estudiante posee un formato json invalido o faltan datos' }

        if (req.params.dni != nuevo.dni)
            throw { status: 400, descripcion: 'el dni provisto no coincide entre el recurso buscado y el nuevo' }

        const estuActualizado = await sitiosDAO.updateByDni(req.params.dni, nuevo)
        res.json(estuActualizado)
    } catch (err) {
        res.status(err.status).json(err)
    }
})

function esEstudianteInvalido(estudiante) {
    const schema = {
        nombre: Joi.string().alphanum().min(1).required(),
        apellido: Joi.string().alphanum().min(1).required(),
        edad: Joi.number().integer().min(0).max(120).required(),
        dni: Joi.number().integer().min(1).max(99999999).required()
    }
    const { error } = Joi.validate(estudiante, schema);
    return error
}
*/
module.exports = router