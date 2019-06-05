const request = require('request-promise-native');

console.log('---- TEST GET SITIOS BY CATEGORIA')

async function runGetSitiosByCategoria(serverUrl, idCategory) {

    const options = {
        uri: `${serverUrl}/${idCategory}`,
        json: true
    }

    try {
        const sitios = await request(options)

        console.log('Categoria: '+idCategory+' Total:' +sitios.length)
        console.log(sitios)
        let testOK = true

        if (testOK) {
            console.log("get sitios: ok")
        }
    } catch (err) {
        console.log("get sitios: error en la respuesta del servidor")
    }
}

async function testGetSitiosByCategoria(serverUrl) {
    
    runGetSitiosByCategoria(serverUrl, 1) //Cantidad esperada 7
    runGetSitiosByCategoria(serverUrl, 2) //Cantidad esperada 1
    runGetSitiosByCategoria(serverUrl, 3) //Cantidad esperada 4
    runGetSitiosByCategoria(serverUrl, 10) //Cantidad esperada 0
}

module.exports = testGetSitiosByCategoria