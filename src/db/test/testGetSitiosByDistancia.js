const request = require('request-promise-native');

console.log('---- TEST GET SITIOS BY DISTANCIA')

async function runGetSitiosByDistancia(serverUrl, distancia, idCategoria, lat, lng, cantSitios) {

    const options = {
        uri: `${serverUrl}/${distancia}/${idCategoria}/${lat}/${lng}`,
        json: true
    }

    try {
        const sitios = await request(options)

        //console.log('Total Sitios: ' +sitios.length+ ' || Distancia: '+distancia+' | idCategoria: ' +idCategoria+' | lat: '+lat+' | lng: '+lng+' | Sitios esperados: '+cantSitios)
        

        if (sitios.length == cantSitios){
            console.log("unitTest: ok")       
        }else{  
            console.log("unitTest: not ok")        
        }

    } catch (err) {
        console.log("get sitios: error en la respuesta del servidor")
    }
}

async function testGetSitiosByDistancia(serverUrl) {
    
    
    runGetSitiosByDistancia(serverUrl, 1,1,-34.627584,-58.4523776,1 ) //Cantidad de Sitios esperados: 1
    runGetSitiosByDistancia(serverUrl, 2,1,-34.627584,-58.4523776,3 ) //Cantidad de Sitios esperados: 3
    runGetSitiosByDistancia(serverUrl, 0.5,1,-34.627584,-58.4523776,6 ) //Cantidad de Sitios esperados: 1
    runGetSitiosByDistancia(serverUrl, 8,1,-34.627584,-58.4523776,7 ) //Cantidad de Sitios esperados: 7
    runGetSitiosByDistancia(serverUrl, 0.1,1,-34.627584,-58.4523776,0 ) //Cantidad de Sitios esperados: 0
    runGetSitiosByDistancia(serverUrl, 0.1,2,-34.627584,-58.4523776,0 ) //Cantidad de Sitios esperados: 0
    runGetSitiosByDistancia(serverUrl, 4,2,-34.627584,-58.4523776,1 ) //Cantidad de Sitios esperados: 1
    runGetSitiosByDistancia(serverUrl, 4,3,-34.627584,-58.4523776,4 ) //Cantidad de Sitios esperados: 4

    runGetSitiosByDistancia(serverUrl, 3,1,-34.609953,-58.4292301,5 ) //Cantidad de Sitios esperados: 5
    runGetSitiosByDistancia(serverUrl, 2,1,-34.609953,-58.4292301,2 ) //Cantidad de Sitios esperados: 2
    runGetSitiosByDistancia(serverUrl, 8,1,-34.609953,-58.4292301,7 ) //Cantidad de Sitios esperados: 7
    runGetSitiosByDistancia(serverUrl, 8,2,-34.609953,-58.4292301,1 ) //Cantidad de Sitios esperados: 1
    runGetSitiosByDistancia(serverUrl, 8,3,-34.609953,-58.4292301,4 ) //Cantidad de Sitios esperados: 4
    runGetSitiosByDistancia(serverUrl, 2,3,-34.609953,-58.4292301,3 ) //Cantidad de Sitios esperados: 3
    runGetSitiosByDistancia(serverUrl, 0.3,3,-34.609953,-58.4292301,1 ) //Cantidad de Sitios esperados: 1
    
    
}

module.exports = testGetSitiosByDistancia