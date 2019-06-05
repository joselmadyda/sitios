const request = require('request-promise-native');

console.log('---- TEST GET SITIOS')

async function testGetSitios(serverUrl) {

    const options = {
        uri: `${serverUrl}`,
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
}

module.exports = testGetSitios