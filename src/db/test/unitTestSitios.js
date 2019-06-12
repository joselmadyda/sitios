const testGetSitios = require('./testGetSitios')
const testGetSitiosByCategoria = require('./testGetSitiosByCategoria')
const testGetSitiosByDistancia = require('./testGetSitiosByDistancia')
const testAddSitios = require('./testAddSitios')

const serverUrl = 'http://127.0.0.1'
const serverPort = '8090'
const api = 'api'
const seccion = 'sitios'


const urlSitios = serverUrl + ":" + serverPort + "/" + api + "/" + seccion

async function main() {

    await testGetSitios(urlSitios) //Debe devolver todos los sitios creados (total 12)
    await testGetSitiosByCategoria(urlSitios) 
    await testGetSitiosByDistancia(urlSitios) //Debe devolver sitios que estén dentro de la distancia solicitada de acuerdo a las coordenadas ingresadas
    //await testAddSitios(urlSitios)
}

main()
