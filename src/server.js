const express = require('express')


const sitiosRouter = require('./sitiosRouter')
const categoriasRouter = require('./categoriasRouter')
const emailRouter = require('./emailRouter')

//Permitir el uso de llamadas por servicio desde páginas
var cors = require('cors')

const app = express()



app.use(express.json())

//Uso de cors()
app.use(cors())

app.set('json spaces', 4)

app.use('/api/sitios', sitiosRouter)
app.use('/api/categorias', categoriasRouter)
app.use('/api/email', emailRouter)

const appPort = 8090
const emailPort = 3000

//App Port
app.listen(appPort, () => {
    console.log(`servidor inicializado en puerto ${appPort}`)
})

//Email Port
app.listen(emailPort, () => {
    console.log(`servidor de correo inicializado en puerto ${emailPort}`)
})
