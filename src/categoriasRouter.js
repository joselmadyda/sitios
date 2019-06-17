const express = require('express')
const _ = require('lodash')
const categoriasDAO = require('./categoriasDAO_SQL')
const router = express.Router()

//Base URI
const baseURI = '/api/categorias'

/**
 * Servicio GET: Lista todas las categorías
 */
router.get('/', async (req, res) => {
    console.log(`GETTING: ${baseURI}${req.url}`)

    if (_.isEmpty(req.query)) {
        try {
            const result = await categoriasDAO.getAllCategories()
            console.log(result)
            res.json(result)
        } catch (err) {
            res.status(err.status).json(err)
        }
    }
})

/**
 * Servicio GET: Lista categoría por id de Categoría
 */
router.get('/:cat', async (req, res) => {
    console.log(`GETTING: ${baseURI}${req.url}`)

    try {

        if (isNaN(req.params.cat))
            throw { status: 400, descripcion: 'Categoría inválida' }

        const resultado = await categoriasDAO.getByIdCategory(req.params.cat)

        if (!resultado)
            throw { status: 404, descripcion: 'categoria no encontrada' }

        console.log(resultado)
        res.status(200).json(resultado)
    } catch (err) {
        res.status(err.status).json(err)
    }
})

/**
 * Servicio POST: Agrega nueva categoría
 */
router.post('/', async (req, res) => {
    console.log(`POSTING: ${baseURI}${req.url}`)

    try {
        const nuevaCategory = req.body
        const categoriaCreada = await categoriasDAO.addCategory(nuevaCategory)
        const mensajeResponse = { status: 'CREADO CORRECTAMENTE', categoriaCreada }
        res.status(201).json(mensajeResponse)

    } catch (err) {
        res.status(err.status).json(err)
    }
})

/**
 * Servicio DELETE: Elimina categoría
 */
router.delete('/:cat', async (req, res) => {
    console.log(`DELETING: ${baseURI}${req.url}`)

    try {
        if (isNaN(req.params.cat))
            throw { status: 400, descripcion: 'id categoria inválido' }
        const resultado = await categoriasDAO.deleteByCategoria(req.params.cat)
        res.json(resultado)
    } catch (err) {
        res.json(err)
    }
})


module.exports = router