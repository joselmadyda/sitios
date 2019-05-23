const dotenv = require('dotenv')

dotenv.config()

const dbConfigs = {
    home: {
        client: 'mssql',
        connection: {
            server: 'localhost,1433',
            user: 'web',
            password: '1234',
            database: 'Sitios'
        }
    },
}

const knex = require('knex')(dbConfigs['home'])

function getAll() {
    try {
        const selectAllQuery = `SELECT * FROM Sitios;`
        const result = knex.raw(selectAllQuery)
        return result

    } catch (err) {
        throw { status: 500, descripcion: err.message }
    }
}

const res = getAll();

console.log("test")