const knex = require('./db/knex')

async function getAllCategories() {
    const selectAllQuery = `SELECT * FROM categorias;`
    const result = await knex.raw(selectAllQuery)

    return result
}

async function addCategory(nuevo) {
    try {
        let insertionQuery = 'INSERT INTO categorias '
        insertionQuery += '(nombre_cat) '
        insertionQuery += `VALUES ('${nuevo.nombre_cat}')`
        await knex.raw(insertionQuery)
        return nuevo
    } catch (err) {
        throw { status: 500, descripcion: err.message }
    }
}

async function getByIdCategory(cat) {

    const selectByIdCategory = `SELECT * FROM categorias WHERE id_cat='${cat}';`
    const result = await knex.raw(selectByIdCategory)

    return result
}
async function deleteByCategoria(cat) {
    const deleteByIdCategory = `DELETE FROM categorias WHERE id_cat=${cat}`
    await knex.raw(deleteByIdCategory)
    return
}

module.exports = {
    getAllCategories,
    getByIdCategory,
    addCategory,
    deleteByCategoria
}
