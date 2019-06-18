const testGetCategorias = require('./testGetCategorias')
const testGetCategoriaById = require('./testGetCategoriaById')
const testDeleteCategoriaById = require('./testDeleteCategoriaById')
const testAddCategoria = require('./testAddCategoria')

const serverUrl = 'http://127.0.0.1'
const serverPort = '8090'
const api = 'api'
const seccion = 'categorias'

const urlCategorias = serverUrl + ":" + serverPort + "/" + api + "/" + seccion

async function main() {

    await testGetCategorias(urlCategorias)
    await testGetCategoriaById(urlCategorias)
    await testDeleteCategoriaById(urlCategorias)

}

main()
