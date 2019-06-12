const request = require('request-promise-native');

console.log('---- TEST GET SITIOS BY CATEGORIA')

async function runGetSitiosByCategoria(serverUrl, idCategory, cantSitios) {

    const options = {
        uri: `${serverUrl}/${idCategory}`,
        json: true
    }

    try {
        const sitios = await request(options)

        console.log('Categoria: '+idCategory+' Sitios devueltos:' +sitios.length+' Sitios esperados:' + cantSitios)

        if (sitios.length == cantSitios){
            console.log("unitTest: ok")       
        }else{  
            console.log("unitTest: not ok")        
        }

    } catch (err) {
        console.log("get sitios: error en la respuesta del servidor")
    }
}

async function testGetSitiosByCategoria(serverUrl) {
    
    runGetSitiosByCategoria(serverUrl, 1, 7) //Cantidad esperada 7
    runGetSitiosByCategoria(serverUrl, 2, 3) //Cantidad esperada 1
    runGetSitiosByCategoria(serverUrl, 3, 4) //Cantidad esperada 4
    runGetSitiosByCategoria(serverUrl, 10, 0) //Cantidad esperada 0
}

module.exports = testGetSitiosByCategoria