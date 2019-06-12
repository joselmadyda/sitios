const request = require('request-promise-native');

console.log('---- TEST ADD CATEGORIAS')

async function runTestAddCategoria(serverUrl, objCategoria) {

    const options = {
        method: 'POST',
        uri: `${serverUrl}`,
        body: objCategoria,
        json: true
    }
    

    try {
        const testResult = await request(options)

        if (!testResult) {
            console.log("post categoria: error")
        }else if(testResult) {
            console.log("post categoria: ok")
        }
    } catch (err) {
        console.log("Add categoría: error en la respuesta del servidor")
    }

    console.log(4)
}


async function testAddCategoria(serverUrl) {

    const objCategoria = [{
        nombre_cat: "VETERINARIA"
    }]

    runTestAddCategoria(serverUrl, objCategoria)
}

module.exports = testAddCategoria