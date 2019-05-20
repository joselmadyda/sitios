const express = require('express')
const { port } = require('./config')
const sitiosRouter = require('./routes/sitiosRouter')

const app = express()

app.use(express.json())

app.set('json spaces', 4)

app.use('/api/sitios', sitiosRouter)

app.listen(port, () => {
    console.log(`servidor inicializado en puerto ${port}`)
})
