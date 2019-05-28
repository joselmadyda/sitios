const express = require('express')
//const { port } = require('./db/config')

const sitiosRouter = require('./sitiosRouter')
const categoriasRouter = require('./categoriasRouter')

//Permitir el uso de llamadas por servicio desde páginas
var cors = require('cors')

const app = express()

app.use(express.json())

//Uso de cors()
app.use(cors())

app.set('json spaces', 4)

app.use('/api/sitios', sitiosRouter)
app.use('/api/categorias', categoriasRouter)

const port = 8090

app.listen(port, () => {
    console.log(`servidor inicializado en puertoo ${port}`)
})
