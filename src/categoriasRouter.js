const express = require('express')
const _ = require('lodash')
//const Joi = require('@hapi/joi')
// const sitiosDAO = require('./sitiosDAO')
const categoriasDAO = require('./categoriasDAO_SQL')

const router = express.Router()

const baseURI = '/api/categorias'

router.get('/', async (req, res) => {
    console.log(`GETTING: ${baseURI}${req.url}`)

    if (_.isEmpty(req.query)) {
        _handleGetAll(req, res)
    }
})

async function _handleGetAll(req, res) {
    try {
        const result = await categoriasDAO.getAllCategories()
        console.log(result)
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

        const resultado = await categoriasDAO.getByIdCategory(req.params.cat)

        if (!resultado)
            throw { status: 404, descripcion: 'categoria no encontrada' }

        console.log(resultado)
        res.status(200).json(resultado)
    } catch (err) {
        res.status(err.status).json(err)
    }
})




router.post('/', async (req, res) => {
    console.log(`POSTING: ${baseURI}${req.url}`)

    try {
        const nuevaCategory = req.body

        const categoriaCreada = await categoriasDAO.addCategory(nuevaCategory)

        const mensajeResponse = { status: 'CREADO CORRECTAMENTE', categoriaCreada }

        res.status(201).json(mensajeResponse)

        //res.status(201).json(categoriaCreada)
    } catch (err) {
        res.status(err.status).json(err)
    }
})






module.exports = router