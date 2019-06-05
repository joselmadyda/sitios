const testEnviarEmail = require('./testGetEmail')

const serverUrl = 'http://127.0.0.1'
const serverPort = '3000'
const api = 'api'
const seccion = 'email'


const urlEmail = serverUrl + ":" + serverPort + "/" + api + "/" + seccion



async function main() {

    await testEnviarEmail(urlEmail)
}

main()
