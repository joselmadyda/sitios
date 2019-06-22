const request = require('request-promise-native');
var Isemail = require('isemail');



console.log('---- TEST GET EMAIL')

async function runEnviarEmail(serverUrl, correo, expectedErrorCode) {

    const options = {
        uri: `${serverUrl}/${correo.mail}`,
        json: true
    }


    try {
        //    console.log(correo)
        //  console.log(!Isemail.validate(correo.mail))

        await request(options)

        console.log(`UNITEST MAIL: Envio Correcto a ${correo.mail} (esperado)`)

    } catch (error) {
        // console.log (error.message)
        if (error.statusCode == expectedErrorCode) {
            console.log("ENVIO DE MAIL: ok (con error esperado)")
        } else {
            console.log(`ENVIO DE MAIL: error inesperado, detalle: ${error.descripcion}`)
        }
    }


}


async function testEnviarEmail(serverUrl) {


    runEnviarEmail(serverUrl, { mail: "prueba.com" }, 400) //Debe arrojar error de formato

    runEnviarEmail(serverUrl, { mail: "gonzavidau@gmail.com" }) //Debe arrojar envio correcto

    runEnviarEmail(serverUrl, { mail: "lalala@@ss.com" }, 400) //Debe arrojar error de formato


}




module.exports = testEnviarEmail