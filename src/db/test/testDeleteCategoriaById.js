const request = require('request-promise-native');

async function runDeleteCategoriaById(serverUrl, idCategory, expectedErrorCode) {

  

    const options = {
        method: 'DELETE',
        uri: `${serverUrl}/${idCategory}`,
        json: true
    }

    try {
        await request(options)
        console.log('Categoría:'+idCategory)
        console.log('delete: ok')

    } catch (err) {
        if (err.statusCode == expectedErrorCode) {
            console.log("delete: ok (con error esperado)")
        } else {
            console.log("delete: error inesperado")
        }
    }
}

async function testDeleteByIdCategoria(serverUrl) {

    console.log('---- TEST DELETE CATEGORIAS')

    runDeleteCategoriaById(serverUrl, 1)
    runDeleteCategoriaById(serverUrl, 2, 404)
}

module.exports = testDeleteByIdCategoria