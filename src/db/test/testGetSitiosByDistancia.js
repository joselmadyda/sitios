const request = require('request-promise-native');

console.log('---- TEST GET SITIOS BY DISTANCIA')

async function runGetSitiosByDistancia(serverUrl, distancia, idCategoria, lat, lng) {

    const options = {
        uri: `${serverUrl}/${distancia}/${idCategoria}/${lat}/${lng}`,
        json: true
    }

    try {
        const sitios = await request(options)

        console.log('Total Sitios: ' +sitios.length+ ' || Distancia: '+distancia+' | idCategoria: ' +idCategoria+' | lat: '+lat+' | lng: '+lng)
        console.log(sitios)
        let testOK = true

        if (testOK) {
            console.log("get sitios: ok")
        }
    } catch (err) {
        console.log("get sitios: error en la respuesta del servidor")
    }
}

async function testGetSitiosByDistancia(serverUrl) {
    
    
    runGetSitiosByDistancia(serverUrl, 1,1,-34.627584,-58.4523776 ) //Cantidad de Sitios esperados: 1
    runGetSitiosByDistancia(serverUrl, 2,1,-34.627584,-58.4523776 ) //Cantidad de Sitios esperados: 3
    runGetSitiosByDistancia(serverUrl, 0.5,1,-34.627584,-58.4523776 ) //Cantidad de Sitios esperados: 1
    runGetSitiosByDistancia(serverUrl, 8,1,-34.627584,-58.4523776 ) //Cantidad de Sitios esperados: 7
    runGetSitiosByDistancia(serverUrl, 0.1,1,-34.627584,-58.4523776 ) //Cantidad de Sitios esperados: 0
    runGetSitiosByDistancia(serverUrl, 0.1,2,-34.627584,-58.4523776 ) //Cantidad de Sitios esperados: 0
    runGetSitiosByDistancia(serverUrl, 4,2,-34.627584,-58.4523776 ) //Cantidad de Sitios esperados: 1
    runGetSitiosByDistancia(serverUrl, 4,3,-34.627584,-58.4523776 ) //Cantidad de Sitios esperados: 4

    runGetSitiosByDistancia(serverUrl, 3,1,-34.609953,-58.4292301 ) //Cantidad de Sitios esperados: 5
    runGetSitiosByDistancia(serverUrl, 2,1,-34.609953,-58.4292301 ) //Cantidad de Sitios esperados: 2
    runGetSitiosByDistancia(serverUrl, 8,1,-34.609953,-58.4292301 ) //Cantidad de Sitios esperados: 7
    runGetSitiosByDistancia(serverUrl, 8,2,-34.609953,-58.4292301 ) //Cantidad de Sitios esperados: 1
    runGetSitiosByDistancia(serverUrl, 8,3,-34.609953,-58.4292301 ) //Cantidad de Sitios esperados: 4
    runGetSitiosByDistancia(serverUrl, 2,3,-34.609953,-58.4292301 ) //Cantidad de Sitios esperados: 3
    runGetSitiosByDistancia(serverUrl, 0.3,3,-34.609953,-58.4292301 ) //Cantidad de Sitios esperados: 1
    
    
}

module.exports = testGetSitiosByDistancia