const request = require('request-promise-native');

console.log('---- TEST GET CATEGORIAS')

async function testGetCategorias(serverUrl) {

    const options = {
        uri: `${serverUrl}`,
        json: true
    }

    try {
        const categorias = await request(options)

        console.log(categorias)

        let testOK = true

        if (testOK) {
            console.log("get all: ok")
        }
    } catch (err) {
        console.log("get all: error en la respuesta del servidor")
    }
}

module.exports = testGetCategorias