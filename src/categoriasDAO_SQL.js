const knex = require('./db/knex')

/**
 * Obtener todos las categorias | Tabla -> [categorias]
 */
async function getAllCategories() {
    const selectAllQuery = `SELECT * FROM categorias;`
    const result = await knex.raw(selectAllQuery)

    return result
}

/**
 * Agregar categoria | Tabla -> [categorias]
 */
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

/**
 * Obtener categoría por Id de categoria | Tabla -> [categorias]
 */
async function getByIdCategory(cat) {

    const selectByIdCategory = `SELECT * FROM categorias WHERE id_cat='${cat}';`
    const result = await knex.raw(selectByIdCategory)

    return result
}

/**
 * Eliminar categoría por Id de categoria | Tabla -> [categorias]
 */
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
