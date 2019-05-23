const express = require('express')
//const { port } = require('./db/config')
const sitiosRouter = require('./sitiosRouter')
var cors = require('cors')

const app = express()

app.use(express.json())

app.use(cors())

app.set('json spaces', 4)

app.use('/api/sitios', sitiosRouter)

const port = 8090

app.listen(port, () => {
    console.log(`servidor inicializado en puertoo ${port}`)
})
