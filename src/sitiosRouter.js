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
        _handleGetWithQS(req, res)
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



/*
async function _handleGetWithQS(req, res) {
    try {
        if (isNaN(req.query.edadMin) || isNaN(req.query.edadMax))
            throw { status: 400, descripcion: 'las edades provistas no son numéricas' }

        if (req.query.edadMin < 0 || req.query.edadMax < 0)
            throw { status: 400, descripcion: 'las edades provistas no son positivas' }

        const result = await sitiosDAO.getByAge(req.query.edadMin, req.query.edadMax)
        res.json(result)
    } catch (err) {
        res.status(err.status).json(err)
    }
}
*/
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


router.get('/:sitiosbarrio', async (req, res) => {
    console.log(`GETTING: ${baseURI}${req.url}`)

    try {

        //ALGUNA VALIDACION ??
        const resultado = await sitiosDAO.getByBarrio(req.params.barrio)

        if (!resultado)
            throw { status: 404, descripcion: 'Lo sentimos, no hay resultados en su barrio' }

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

        //if (esEstudianteInvalido(nuevo))
        //    throw { status: 400, descripcion: 'el estudiante posee un formato json invalido o faltan datos' }

        //Enviamos el Insert a la tabla de Sitios
        const sitioCreado = await sitiosDAO.addSitio(sitioNuevo)

        res.status(201).json(sitioCreado)
    } catch (err) {
        
        res.status(err.status).json(err)
    }
})




/*
            PARA CATEGORIA
            router.post('/', async (req, res) => {
                console.log(`POSTING: ${baseURI}${req.url}`)

                try {
                    const nuevo = req.body
                    console.log(nuevo)
                    //if (esEstudianteInvalido(nuevo))
                    //    throw { status: 400, descripcion: 'el estudiante posee un formato json invalido o faltan datos' }

                    const categoriaCreada = await sitiosDAO.addCategory(nuevo)
                    res.status(201).json(categoriaCreada)
                } catch (err) {
                    res.status(err.status).json(err)
                }
            })

*/
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
    }
    */
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