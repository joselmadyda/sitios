const knex = require('../db/knex')

function getAll() {
    try {
        const selectAll = `SELECT * FROM Sitios`
        const result = knex.raw(selectAll)
        return result 

    } catch (err) {
        throw { status: 500, descripcion: err.message }
    }
}

const res = getAll();


console.log("test")

module.exports = {
    getAll
}