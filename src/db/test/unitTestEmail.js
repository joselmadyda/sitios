const testEnviarEmail = require('./testGetEmail')

const serverUrl = 'http://127.0.0.1'
const serverPort = '8090'
const api = 'api'
const seccion = 'sitios'
const modulo = 'email'

const urlEmail = serverUrl + ":" + serverPort + "/" + api + "/" + seccion + "/" + modulo

async function main() {

    await testEnviarEmail(urlEmail)
}

main()
