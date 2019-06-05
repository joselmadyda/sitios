const request = require('request-promise-native');



async function runTestCategoriaById(serverUrl, idCategory, expectedErrorCode) {

    console.log('---- TEST GET CATEGORIA BY ID')

    const options = {
        uri: `${serverUrl}/${idCategory}`,
        json: true
    }

    try {
        const categoria = await request(options)
        let testOK = true

        console.log(categoria)

        if (categoria.length == 0) {
            console.log("get by idCategoria: id inexistenteeeeeee")
            testOK = false
        }

        if (testOK) {
            console.log("get by idCategoria: ok")
        }
    } catch (err) {
        console.log("get by idCategoria: error en la respuesta del servidor")
    }
}

async function testGetCategoriaById(serverUrl) {

    

    runTestCategoriaById(serverUrl, 1)
    runTestCategoriaById(serverUrl, 2)
    runTestCategoriaById(serverUrl, 3)
    runTestCategoriaById(serverUrl, 4)
}



module.exports = testGetCategoriaById