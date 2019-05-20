const { dbConfig } = require('./config.js')
const knex = require('knex')(dbConfig)
console.log("prueba")

module.exports = knex


