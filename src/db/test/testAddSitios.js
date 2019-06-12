const request = require('request-promise-native');

console.log('---- TEST GET SITIOS')

async function runTestAddSitios(serverUrl, objSitio) {

    const options = {
        method: 'POST',
        uri: `${serverUrl}`,
        body: objSitio,
        json: true
    }

    try {
        const sitios = await request(options)

        
        console.log('Total Sitios:' +sitios.length)
        console.log(sitios)
        let testOK = true

        if (testOK) {
            console.log("get sitios: ok")
        }
    } catch (err) {
        console.log("get sitios: error en la respuesta del servidor")
    }

console.log(4)
}


async function testAddSitios(serverUrl) {
    
    const objSitio = {
      
        
    }

    runTestAddSitios(serverUrl, objSitio) 
}

module.exports = testAddSitios