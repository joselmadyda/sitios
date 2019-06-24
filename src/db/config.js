
const dotenv = require('dotenv')
dotenv.config()

const dbConfigs = {
    home: {
        client: 'mssql'   ,
        connection: {
            server: 'localhost',
            //server: 'localhost\\SQLEXPRESS',
            port: 1433, 
            user: 'web',
            password: '1234',
            database: 'Sitios'        
        }
    },
}

const srvConfigs = {
    port: process.env.PORT || 8090,
    env: process.env.DB_ENV
}

module.exports = {
    dbConfig: dbConfigs['home'],
    port: srvConfigs.port
}