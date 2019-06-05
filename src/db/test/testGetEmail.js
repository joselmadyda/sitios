const request = require('request-promise-native');

console.log('---- TEST GET EMAIL')

async function runEnviarEmail(serverUrl, correo) {

    const options = {
        uri: `${serverUrl}/${correo}`,
        json: true
    }

    try {
        const envioCorreo = await request(options)

        if (!envioCorreo) {
            console.log("UNITTESTING: Envio Incorrecto")
        } else {
            console.log("UNITTESTING: Envio Correcto")
        }
    } catch (err) {
        console.log("error: no se puede enviar el mail")
    }
}

async function testEnviarEmail(serverUrl) {
    runEnviarEmail(serverUrl, "prueba.com") //Debe arrojar error de envío
    runEnviarEmail(serverUrl, "alejandro.samsonowicz@witbor.com") //Debe arrojar envio correcto
}

module.exports = testEnviarEmail